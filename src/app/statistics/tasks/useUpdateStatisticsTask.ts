import { AddVerseToInboxDeck, InboxCardMemorized, ReviewCardReviewed } from '@akdasa-studios/shlokas-core'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatisticsStore } from '@/app/statistics'
import { useAppStateStore, useApplication } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'


/**
 * Updates statistics in the background.
 */
export function useUpdateStatisticsTask() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const app             = useApplication()
  const statisticsStore = useStatisticsStore()
  const appStateStore   = useAppStateStore()
  const settingsStore   = useSettingsStore()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { isActive } = storeToRefs(appStateStore)
  const { syncAt }   = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function run() {
    watch([
      app.now,
      app.currentContextName,
      isActive,
      syncAt
    ], updateStatistics)

    app.instance().commandExecuted.subscribe(onCommandExecuted)
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onCommandExecuted(e) {
    if (e instanceof ReviewCardReviewed)  { await updateStatistics() }
    if (e instanceof InboxCardMemorized)  { await updateStatistics() }
    if (e instanceof AddVerseToInboxDeck) { await updateStatistics() }
  }


  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  async function updateStatistics() {
    const date = nextDays(1, app.application.timeMachine.today)
    statisticsStore.cardsCountDueToTomorrow = (await app.application.reviewDeck.dueToCards(date)).length
    statisticsStore.cardsInReview = (await app.application.reviewDeck.dueToCards(app.application.timeMachine.now)).length
    statisticsStore.cardsInInbox = (await app.application.inboxDeck.cards()).length
  }

  function nextDays(days: number, date?: Date) {
    const result = date ? new Date(date) : new Date()
    result.setDate(result.getDate()+days)
    return result
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { run }

}



