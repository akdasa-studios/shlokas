import { Application } from "@akdasa-studios/shlokas-core"
import { defineStore } from "pinia"
import { ref } from "vue"

function nextDays(days: number) {
  const result = new Date()
  result.setDate(result.getDate()+days)
  return result
}

export function useStatisticsStore(app: Application) {
  return defineStore('statistics', () => {
    const cardsCountDueToTomorrow = ref(0)

    async function load() {
      const cards = await app.reviewDeck.dueToCards(nextDays(1))
      cardsCountDueToTomorrow.value = cards.length
    }

    return { load, cardsCountDueToTomorrow }
  })()
}