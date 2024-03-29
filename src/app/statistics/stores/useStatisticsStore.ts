import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useStatisticsStore = defineStore('statistics', () => {
  const cardsCountDueToTomorrow = ref(0)
  const cardsInReview = ref(0)
  const cardsInInbox = ref(0)

  return { cardsCountDueToTomorrow, cardsInInbox, cardsInReview }
})
