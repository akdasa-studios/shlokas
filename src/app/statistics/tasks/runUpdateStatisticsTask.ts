import { AddVerseToInboxDeck, InboxCardMemorized, ReviewCardReviewed } from '@akdasa-studios/shlokas-core'

import { watch } from 'vue'
import { useStatisticsStore } from '@/app/statistics'
import { useApplication, useEmitter } from '@/app/shared'


export function runUpdateStatisticsTask() {
  const statisticsStore = useStatisticsStore()
  const app = useApplication()
  const emitter = useEmitter()


  watch(app.now, async () => await updateStatistics())
  watch(app.currentContextName, async () => await updateStatistics())

  emitter.on('commandExecuted', async (e) => {
    if (e instanceof ReviewCardReviewed) { await updateStatistics() }
    if (e instanceof InboxCardMemorized) { await updateStatistics() }
    if (e instanceof AddVerseToInboxDeck) { await updateStatistics() }
  })
  emitter.on('appStateChanged', async () => await updateStatistics())
  emitter.on('syncCompleted', async () => await updateStatistics())

  async function updateStatistics() {
    const date = nextDays(1, app.application.timeMachine.today)
    statisticsStore.cardsCountDueToTomorrow = (await app.application.reviewDeck.dueToCards(date)).length
    statisticsStore.cardsInReview = (await app.application.reviewDeck.dueToCards(app.application.timeMachine.now)).length
    statisticsStore.cardsInInbox = (await app.application.inboxDeck.cards()).length
  }
}

function nextDays(days: number, date?: Date) {
  const result = date ? new Date(date) : new Date()
  result.setDate(result.getDate()+days)
  return result
}
