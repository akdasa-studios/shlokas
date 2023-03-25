import { AddVerseToInboxDeck, Application, InboxCardMemorized, ReviewCardReviewed } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'

import { useStatisticsStore } from '@/app/statistics'


export function runUpdateStatisticsTask(app: Application, emitter: EventEmitter2) {
  const statisticsStore = useStatisticsStore()

  emitter.on('commandExecuted', async (e) => {
    if (e instanceof ReviewCardReviewed) { await updateStatistics() }
    if (e instanceof InboxCardMemorized) { await updateStatistics() }
    if (e instanceof AddVerseToInboxDeck) { await updateStatistics() }
  })
  emitter.on('appStateChanged', async () => await updateStatistics())
  emitter.on('syncCompleted', async () => await updateStatistics())

  async function updateStatistics() {
    statisticsStore.cardsCountDueToTomorrow = await (await app.reviewDeck.dueToCards(nextDays(1))).length
    statisticsStore.cardsInReview = (await app.reviewDeck.dueToCards(app.timeMachine.now)).length
    statisticsStore.cardsInInbox = (await app.inboxDeck.cards()).length
  }
}

function nextDays(days: number) {
  const result = new Date()
  result.setDate(result.getDate()+days)
  return result
}
