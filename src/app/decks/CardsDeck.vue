<template>
  <div class="deck">
    <slot
      v-for="(card, idx) in cardsToShow"
      :key="card.id"
      :card="card"
      :index="idx"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs, computed } from 'vue'

interface ICard {
  id: string,
}

const props = defineProps<{
  cards: ICard[],
  showCards: number
}>()

const { cards, showCards } = toRefs(props)

const cardsToShow = computed(() => cards.value.slice(0, showCards.value))
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