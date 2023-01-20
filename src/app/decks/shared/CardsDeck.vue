<template>
  <div class="deck">
    <div
      v-for="item in cards"
      :key="item.id"
      :ref="(el) => setRefs(item.index.value, el)"
      class="card1"
      :style="calculateStyle(item)"
    >
      <slot :card="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits, defineProps} from 'vue'
import interact from 'interactjs'
import { Vector3d } from './Vector3d'
// import { CardViewModel } from './CardViewModel'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  cards: any[],
}>()

const emit = defineEmits<{
  (e: 'place',  state: any): void
  (e: 'moving', state: any, deltaPos: Vector3d, allDeltaPos: Vector3d): void
  (e: 'moved',  state: any, deltaPos: Vector3d): void
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
  props.cards.forEach(x => emit("place", x))
}, {immediate: true})



function calculateStyle(card: any) {
  if (card.style.value) { return card.style.value }
  return `transform: translateX(${card.position.x}px)` +
         `           translateY(${card.position.y}px)` +
         `           translateZ(${card.position.z}px)` +
         `           rotateX(${card.angle.x}deg)` +
         `           rotateY(${card.angle.y}deg)` +
         `           rotateZ(${card.angle.z}deg);` +
         `transition: .1s linear;`+
         `opacity: ${card.opacity.value};`+
         `z-index: ${10 - card.index.value}`
}

/* -------------------------------------------------------------------------- */
/*                                 Iteractions                                */
/* -------------------------------------------------------------------------- */

function enableInteraction(ref: any) {
  interact(ref).draggable({
    listeners: {
      move(event:any) {
        emit(
          "moving",
          topCardObj.value,
          new Vector3d(event.dx, event.dy, 0),
          new Vector3d(event.pageX - event.x0, event.pageY - event.y0, 0)
        )
      },
      end(event:any) {
        emit(
          "moved",
          topCardObj.value,
          new Vector3d(event.pageX - event.x0, event.pageY - event.y0, 0)
        )
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
  width: calc(100% - 0px);
  height: calc(100% - 10px);
}
</style>
