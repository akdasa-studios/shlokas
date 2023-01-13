<template>
  <div class="deck">
    <slot
      v-for="card in cardsToShow"
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, Ref, toRefs } from 'vue'
import { useArrayFilter } from '@vueuse/core'

interface ICard {
  id: string,
  index: Ref<number>
}

const props = defineProps<{
  cards: ICard[],
  showCards: number
}>()

const { cards, showCards } = toRefs(props)

const cardsToShow = useArrayFilter(cards, (x) => {
  return x.index.value < showCards.value
})
</script>


<style scoped >
.deck {
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1800px;
}
</style>