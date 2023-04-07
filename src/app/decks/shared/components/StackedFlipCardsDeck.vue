<template>
  <CardsDeck
    v-slot="data"
    :cards="cardsToShow"
    :compute-style="computeStyle"
    class="deck"
    card-class="card"
    @place="onCardPlaced"
    @moving="onCardSwiping"
    @moved="onCardSwiped"
  >
    <slot :id="data.card.id" />
  </CardsDeck>
</template>


<script lang="ts" setup>
import { useArrayFilter } from '@vueuse/core'
import { defineEmits, defineExpose, defineProps, ref, toRefs, watch, withDefaults } from 'vue'
import CardsDeck from '@/app/decks/shared/components/CardsDeck.vue'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

type Position = [number, number]
type Direction = 'left' | 'right' | 'up' | 'down' | 'none'

interface Card {
  id: string
  index: number
}

interface SwipeGesture {
  dx: number
  dy: number,
  distance: number,
  direction: Direction
}

const props = withDefaults(defineProps<{
  cards: Card[]
  swipedTime?: number
  canSwipe?: (id: string, swipe: SwipeGesture) => boolean
}>(), {
  swipedTime: 250,
  canSwipe: () => true
})

const emit = defineEmits<{
  (event: 'swipe:moving', id: string, swipe: SwipeGesture): void
  (event: 'swipe:cancel', id: string): void
  (event: 'swipe:finish', id: string, swipe: SwipeGesture): void
}>()

defineExpose({ 'swipeTopCard': swipeTopCard })


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

interface CardState {
  index: number  // order of card in the deck
  state: 'inactive' | 'swiping' | 'swiped'
  posX: number
  posY: number
  angleZ: number
}

const cardStates = ref<{ [id: string]: CardState }>({})
const { cards } = toRefs(props)
const cardsToShow = useArrayFilter(cards, card => card.index <= 2)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

watch(cards, updateCardsState, { immediate: true })


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardPlaced(card: Card) {
  updateCardsState()
  updateInactiveCard(getCardState(card.id))
}

function onCardSwiping(
  card: Card,
  start: [number, number],
  current: [number, number]
) {
  if (card.index != 0) { return }
  const state = getCardState(card.id)
  const delta = getDelta(current, start)
  updateMovingCard(state, delta)
  emit('swipe:moving', card.id, {
    dx: delta[0], dy: delta[1],
    distance: getDistance(current, start),
    direction: getDirection(delta)
  })
}

function onCardSwiped(
  card: Card,
  start: [number, number],
  current: [number, number]
) {
  const state = getCardState(card.id)
  const dist = getDistance(current, start)
  const canSwipe = props.canSwipe(card.id, {
    dx: current[0] - start[0],
    dy: current[1] - start[1],
    distance: dist,
    direction: getDirection(getDelta(current, start))
  })

  if (!canSwipe) {
    updateInactiveCard(state)
    emit('swipe:cancel', card.id)
  } else {
    const delta = getDelta(current, start)
    updateMovedCard(state)
    setTimeout(() => {
      emit('swipe:finish', card.id, {
        dx: delta[0], dy: delta[1],
        distance: getDistance(current, start),
        direction: getDirection(delta)
      })
    }, props.swipedTime)
  }
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getCardState(id: string) {
  return cardStates.value[id]
}

function updateInactiveCard(card: CardState) {
  card.state = 'inactive'
  card.posX = 0
  card.posY = 0
  card.angleZ = 0
}

function updateMovingCard(card: CardState, delta: [number, number]) {
  card.state = 'swiping'
  card.posX = delta[0]
  card.posY = delta[1]
  card.angleZ = card.posX / 30
}

function updateMovedCard(card: CardState) {
  card.state = 'swiped'
  card.posX *= 8
  card.posY *= 8
}

function computeStyle(card: Card) {
  const r = getCardState(card.id)
  const actions = {
    inactive: '.5s ease-in-out',
    swiping:  'none',
    swiped:   '.25s linear'
  }

  const transition = actions[r.state]
  const constY = card.index * 35
  const constZ = -(card.index * 80)

  return `transform: translate3D(${r.posX}px, ${constY + r.posY}px, ${constZ}px) rotateZ(${r.angleZ}deg);
          transition: ${transition};
          z-index: ${10-r.index};`
}

function updateCardsState() {
  for (const [idx, card] of cards.value.entries()) {
    if (cardStates.value[card.id]) { continue }
    cardStates.value[card.id] = {
      index: idx,
      state: 'inactive',
      posX: 0,
      posY: 0,
      angleZ: 0,
    }
  }
}

function getDistance(a: Position, b: Position) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
}

function getDelta(a: Position, b: Position): Position {
  return [a[0] - b[0], a[1] - b[1]]
}

function getDirection(a: Position) {
  const [x, y] = a
  if (x === 0 && y === 0) { return 'none' }
  if (Math.abs(x) > Math.abs(y)) {
    return x > 0 ? 'right' : 'left'
  } else {
    return y > 0 ? 'down' : 'up'
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Actions                                  */
/* -------------------------------------------------------------------------- */

function swipeTopCard() {
  const card = cards.value.find(x => x.index === 0)
  if (card) {
    const state = getCardState(card.id)
    state.posX = -400
    state.state = 'swiped'
  }
}
</script>


<style scoped>
:deep(.card) {
  position: absolute;
  width: 100%;
  height: 100%;
}

.deck {
  width: 100%;
  height: 100%;
  perspective: 1300px;
  transform-style: preserve-3d;
}
</style>