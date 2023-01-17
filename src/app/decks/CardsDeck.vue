<script setup lang="ts">
import { ref, computed, watch, defineEmits, onMounted, defineProps} from 'vue'
import interact from 'interactjs'
import { Vector3d } from './Vector3d'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

type CardAction = "inactive"|"moving"

interface CardState {
  id: string
  index: number,
  position: Vector3d,
  angle: Vector3d,
  action: CardAction
}

const props = defineProps<{
  cards: CardState[],
}>()

const emit = defineEmits<{
  (e: 'place',  state: CardState): void
  (e: 'moving', state: CardState, deltaPos: Vector3d): void
  (e: 'moved',  state: CardState, deltaPos: Vector3d): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const topCardRef = ref()
const topCardObj = computed(() => props.cards.find(x => x.index.value === 0))

function setRefs(idx: number, el: any) {
  if (idx === 0 && el) { topCardRef.value = el }
}

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(topCardRef, (newTopCard, prevTopCard) => {
  if (newTopCard)  { enableInteraction(newTopCard) }
  if (prevTopCard) { disableInteraction(prevTopCard) }
})

watch(topCardObj, () => {
  props.cards.forEach(x => emit("place", x))
})

onMounted(() => {
  props.cards.forEach(x => emit("place", x))
})

function calculateStyle(state: CardState) {
  const transition = state.action === "moving"
    ? 'none'
    : '.5s cubic-bezier(0.075, 0.82, 0.165, 1)'
  return `transform: translateX(${state.position.x}px)` +
         `           translateY(${state.position.y}px)` +
         `           translateZ(${state.position.z}px)` +
         `           rotateX(${state.angle.x}deg)` +
         `           rotateY(${state.angle.y}deg)` +
         `           rotateZ(${state.angle.z}deg);` +
         `transition: ${transition};`}

/* -------------------------------------------------------------------------- */
/*                                 Iteractions                                */
/* -------------------------------------------------------------------------- */

function enableInteraction(ref: any) {
  interact(ref).draggable({
    listeners: {
      start() {
        const card = topCardObj.value as CardState
        card.action = "moving"
      },
      move(event:any) {
        const card = topCardObj.value as CardState
        emit("moving", card, new Vector3d(event.dx, event.dy, 0))
      },
      end() {
        const card = topCardObj.value as CardState
        card.action = "inactive"
        emit("moved", card, new Vector3d(card.position.x, card.position.y, 0))
      }
    }
  })
}

function disableInteraction(ref: any) {
  interact(ref).unset()
}
</script>

<template>
  <div class="deck">
    <div
      v-for="card in cards"
      :key="card.id"
      :ref="(el) => setRefs(card.index.value, el)"
      class="card1"
      :style="calculateStyle(card)"
    >
      <slot :card="card" />
    </div>
  </div>
</template>

<style scoped>
.deck {
  width: 100%;
  height: 100%;
  perspective: 1800px;
  transform-style: preserve-3d;
}

.card1 {
  position: absolute;
  transform-style: preserve-3d;
  /* width: 100%; */
  /* height: 80%; */
  width: calc(100% - 0px);
  height: calc(100% - 10px);
}
</style>
