import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useStatisticsStore = defineStore('statistics', () => {
  const cardsCountDueToTomorrow = ref(0)

  return { cardsCountDueToTomorrow }
})
