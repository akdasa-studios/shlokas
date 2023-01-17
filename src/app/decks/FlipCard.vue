<template>
  <div
    ref="card"
    class="card"
    @click="onCardClicked"
  >
    <div class="face face--front">
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
import { computed, ref } from 'vue'

const flipped = ref<boolean>(false)
const flipAngle = computed(() => flipped.value ? 180 : 0)
const flipAngleBack = computed(() => flipped.value ? 0 : -180)

function onCardClicked() {
  flipped.value = !flipped.value
}
</script>

<style scoped lang="scss">
$flipAngleFront: calc(v-bind(flipAngle) * 1deg);
$flipAngleBack: calc(v-bind(flipAngleBack) * 1deg);

.card {
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  margin: 10px;
  position: absolute;
  perspective: 1800px;
  transition: .5s cubic-bezier(0.34, 1.56, 0.64, 1);
  touch-action: none;
  user-select: none;
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