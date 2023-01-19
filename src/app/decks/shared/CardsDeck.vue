<template>
  <div class="deck">
    <div
      v-for="item in cards"
      :key="item.id"
      :ref="(el) => setRefs(item.index.value, el)"
      class="card1"
      :style="item.style.value"
    >
      <slot :card="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits, onMounted, defineProps} from 'vue'
import interact from 'interactjs'
import { card } from 'ionicons/icons'
import { Vector3d } from './Vector3d'
import { CardViewModel } from './CardViewModel'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  cards: CardViewModel[],
}>()

const emit = defineEmits<{
  (e: 'place',  state: CardViewModel): void
  (e: 'moving', state: CardViewModel, deltaPos: Vector3d, allDeltaPos: Vector3d): void
  (e: 'moved',  state: CardViewModel, deltaPos: Vector3d): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const topCardRef = ref()
const topCardObj = computed(() => props.cards.find(x => x.index.value === 0))
const items = computed(() => props.cards.map(x=>x.id).toString())

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

watch(items, () => {
  console.log("???")
  props.cards.forEach(x => emit("place", x))
}, {immediate:true})

onMounted(() => {
  props.cards.forEach(x => emit("place", x))
})

function calculateStyle(state: CardViewModel) {
  const actions = {
    'moving': 'none',
    // 'inactive': '.6s linear',
    'inactive': '.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);',
    'deleting': '.25s linear'
  }

  const transition = actions[state.action.value] as string
  return `transform: translateX(${state.position.x}px)` +
         `           translateY(${state.position.y}px)` +
         `           translateZ(${state.position.z}px)` +
         `           rotateX(${state.angle.x}deg)` +
         `           rotateY(${state.angle.y}deg)` +
         `           rotateZ(${state.angle.z}deg);` +
         `transition: ${transition};`+
         `opacity: ${state.opacity.value};`+
         `z-index: ${10 - state.index.value}`
}

/* -------------------------------------------------------------------------- */
/*                                 Iteractions                                */
/* -------------------------------------------------------------------------- */

function enableInteraction(ref: any) {
  interact(ref).draggable({
    listeners: {
      start() {
        const card = topCardObj.value as CardViewModel
        card.action.value = "moving"
      },
      move(event:any) {
        const card = topCardObj.value as CardViewModel
        emit(
          "moving",
          card,
          new Vector3d(event.dx, event.dy, 0),
          new Vector3d(event.pageX - event.x0, event.pageY - event.y0, 0)
        )
      },
      end() {
        const card = topCardObj.value as CardViewModel
        card.action.value = "inactive"
        emit("moved", card, new Vector3d(card.position.x, card.position.y, 0))
      }
    }
  })
}

function disableInteraction(ref: any) {
  interact(ref).unset()
}
</script>

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
