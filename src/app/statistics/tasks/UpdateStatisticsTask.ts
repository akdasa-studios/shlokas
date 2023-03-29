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
    const date = nextDays(1, app.timeMachine.today)
    statisticsStore.cardsCountDueToTomorrow = (await app.reviewDeck.dueToCards(date)).length
    statisticsStore.cardsInReview = (await app.reviewDeck.dueToCards(app.timeMachine.now)).length
    statisticsStore.cardsInInbox = (await app.inboxDeck.cards()).length
  }
}

function nextDays(days: number, date?: Date) {
  const result = date ? new Date(date) : new Date()
  result.setDate(result.getDate()+days)
  return result
}
