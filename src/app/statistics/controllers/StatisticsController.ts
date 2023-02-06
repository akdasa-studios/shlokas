import { Application, ReviewCardReviewed } from '@akdasa-studios/shlokas-core'
import { Emitter } from 'mitt'
import { Events } from '@/app/Events'
import { useStatisticsStore } from '@/app/statistics'


export class StatisticsController {
  private statisticsStore = useStatisticsStore()

  constructor(
    private readonly app: Application,
    private readonly emitter: Emitter<Events>
  ) {
    emitter.on('commandExecuted', e => {
      if (e instanceof ReviewCardReviewed) { this.updateStatistics() }
    })
    emitter.on('appOpened', () => this.updateStatistics())
  }

  private async updateStatistics() {
    const cards = await this.app.reviewDeck.dueToCards(nextDays(1))
    this.statisticsStore.cardsCountDueToTomorrow = cards.length
  }
}

function nextDays(days: number) {
  const result = new Date()
  result.setDate(result.getDate()+days)
  return result
}
