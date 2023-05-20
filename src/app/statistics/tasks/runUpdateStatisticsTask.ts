import { AddVerseToInboxDeck, InboxCardMemorized, ReviewCardReviewed } from '@akdasa-studios/shlokas-core'

import { watch } from 'vue'
import { useStatisticsStore } from '@/app/statistics'
import { useApplication, useEmitter } from '@/app/shared'


/**
 * Updates statistics in the background.
 */
export function runUpdateStatisticsTask() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const app             = useApplication()
  const statisticsStore = useStatisticsStore()
  const emitter         = useEmitter()


  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  watch(app.now, onUpdateStatistics)
  watch(app.currentContextName, onUpdateStatistics)

  emitter.on('commandExecuted', async (e) => {
    if (e instanceof ReviewCardReviewed)  { await onUpdateStatistics() }
    if (e instanceof InboxCardMemorized)  { await onUpdateStatistics() }
    if (e instanceof AddVerseToInboxDeck) { await onUpdateStatistics() }
  })
  emitter.on('appStateChanged', onUpdateStatistics)
  emitter.on('syncCompleted',   onUpdateStatistics)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onUpdateStatistics() {
    const date = nextDays(1, app.application.timeMachine.today)
    statisticsStore.cardsCountDueToTomorrow = (await app.application.reviewDeck.dueToCards(date)).length
    statisticsStore.cardsInReview = (await app.application.reviewDeck.dueToCards(app.application.timeMachine.now)).length
    statisticsStore.cardsInInbox = (await app.application.inboxDeck.cards()).length
  }


  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  function nextDays(days: number, date?: Date) {
    const result = date ? new Date(date) : new Date()
    result.setDate(result.getDate()+days)
    return result
  }

}



