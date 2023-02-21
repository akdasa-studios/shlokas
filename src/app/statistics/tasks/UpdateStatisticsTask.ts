import { Application, ReviewCardReviewed } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'

import { useStatisticsStore } from '@/app/statistics'


export function runUpdateStatisticsTask(app: Application, emitter: EventEmitter2) {
  const statisticsStore = useStatisticsStore()

  emitter.on('commandExecuted', async (e) => {
    if (e instanceof ReviewCardReviewed) { await updateStatistics() }
  })
  emitter.on('appStateChanged', async () => await updateStatistics())

  async function updateStatistics() {
    const cards = await app.reviewDeck.dueToCards(nextDays(1))
    statisticsStore.cardsCountDueToTomorrow = cards.length
  }
}

function nextDays(days: number) {
  const result = new Date()
  result.setDate(result.getDate()+days)
  return result
}
