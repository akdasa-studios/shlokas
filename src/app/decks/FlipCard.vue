<template>
  <div
    ref="card"
    class="card"
    @click="onCardClicked"
  >
    <div class="face face--front">
      <!-- {{ props.index }} -->
      <slot name="front" />
    </div>

    <div class="face face--back">
      <slot name="back" />
    </div>

    <div class="face no-events">
      <slot name="overlay" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Interact
import interact from 'interactjs'
import { Target } from '@interactjs/types'

// Vue
import {
  ref, watch, computed, defineProps, defineEmits,
  onMounted, onBeforeUnmount
} from 'vue'


/* -------------------------------------------------------------------------- */
/*                            Component interfaces                            */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  index: number,
  swipeThreshold: number,
  swipeDirections: string[],
  targetX?: number
  targetY?: number
}>()
const emit = defineEmits<{
  (event: 'swiping', direction: string, valiue: number): void,
  (event: 'swiped', direction: string, valiue: number): void,
}>()

/* -------------------------------------------------------------------------- */
/*                          Component internal state                          */
/* -------------------------------------------------------------------------- */

const card = ref()
const flipped = ref<boolean>(false)
const posX = ref<number>(0)
const posY = ref<number>(0)
const posZ = ref<number>(-20)
const angle = ref<number>(0)
const scale = ref<number>(.95)
const flipAngle = computed(() => flipped.value ? 180 : 0)
const flipAngleBack = computed(() => flipped.value ? 0 : -180)

const distance = computed<number>(function () {
  const xaxis = Math.abs(posX.value) > Math.abs(posY.value)
  const value = xaxis ? posX.value : posY.value
  if (value > props.swipeThreshold) { return value - props.swipeThreshold }
  if (value < -props.swipeThreshold) { return value + props.swipeThreshold }
  return 0
})
const direction = computed<string>(function () {
  const xaxis = Math.abs(posX.value) > Math.abs(posY.value)
  return (
     xaxis && posX.value > 0 ? "right"  :
     xaxis && posX.value < 0 ? "left"   :
    !xaxis && posY.value > 0 ? "bottom" :
    !xaxis && posY.value < 0 ? "top"    : "unknown"
  )
})

/* -------------------------------------------------------------------------- */
/*                                   Action                                   */
/* -------------------------------------------------------------------------- */

function reset(index: number) {
  if (index === 0) {
    posX.value = 0
    posY.value = 0
    // posZ.value = -10
    angle.value = 0
    flipped.value = false
  } else {
    card.value.style.transition = ".5s cubic-bezier(0.34, 1.56, 0.64, 1)"
  }
  posZ.value = -(index * 100)
  scale.value = index === 0 ? 1 : .95 //1 - (0.1 * index)
}

function enableInteraction() {
  interact(card.value as Target).draggable({
    listeners: {
      start(event:any) {
        // if (props.index !== 0) { return }
        event.target.style.transition = "none"
      },
      move(event:any) {
        // if (props.index !== 0) { return }
        onSwiping(event.dx, event.dy)
      },
      end(event:any) {
        event.target.style.transition = "0.25s ease-in-out"
        onSwiped()
      }
    }
  })
}

function disableInteraction() {
  interact(card.value as Target).unset()
}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardClicked() {
  flipped.value = !flipped.value
}

function onSwiping(dx: number, dy: number) {
  posX.value += dx
  posY.value += dy

  angle.value = 15 * (posX.value / 300)
  if (angle.value > 15) { angle.value = 15 }
  if (angle.value < -15) { angle.value = -15 }

  emit('swiping', direction.value, distance.value)
}

function onSwiped() {
  const canSwipedInDirection = props.swipeDirections.includes(direction.value)

  if (distance.value != 0 && canSwipedInDirection) {
    angle.value *= 2
    if (direction.value == "left") posX.value *= 8
    if (direction.value == "right") posX.value *= 8
    if (direction.value == "top") posY.value *= 8
    if (direction.value == "bottom") posY.value *= 8

    emit('swiped', direction.value, distance.value)
  } else {
    posX.value = 0
    posY.value = 0
    angle.value = 0
    emit('swiping', "none", 0)
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */
let w1: any
let w2: any
let w3: any



onMounted(() => {
  w1 = watch(() => props.index, function(index: number) {
    // setTimeout(function () {
      reset(index)
    //  } , 10) // go fuck yourself safari
  }, { immediate: true })

  w2 = watch(() => props.targetX, function(value?: number)  {
    posX.value = value || 0
  }, { immediate: true })

  w3 = watch(() => props.targetY, function(value?: number) {
    posY.value = value || 0
  }, { immediate: true })

  enableInteraction()
})

onBeforeUnmount(() => {
  disableInteraction()
  if (w1) { w1() }
  if (w2) { w2() }
  if (w2) { w3() }
})
</script>

<style scoped lang="scss">
$x: calc(v-bind(posX) * 1px);
$y: calc(v-bind(posY) * 1px);
$z: calc(v-bind(posZ) * 1px);
$angle: calc(v-bind(angle) * 1deg);
$scale: v-bind(scale);
$flipAngleFront: calc(v-bind(flipAngle) * 1deg);
$flipAngleBack: calc(v-bind(flipAngleBack) * 1deg);

.card {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 10px;
  position: absolute;
  perspective: 1800px;
  transition: .5s cubic-bezier(0.34, 1.56, 0.64, 1);
  touch-action: none;
  user-select: none;
  // z-index: v-bind(zindex);
  transform: translate($x, $y) translateZ($z) rotate($angle); // scale($scale);
  will-change: transform;

  .face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: .5s ease-in-out;
    overflow: hidden;

    &--front {
      transform: rotateY($flipAngleFront);
    }

    &--back {
      transform: rotateY($flipAngleBack);
    }
  }
}

.no-events {
  pointer-events: none;
}
</style>