<template>
  <div class="card">
    <div
      class="face face--front"
      :class="cardClass"
    >
      <div :class="sideClass">
        <slot name="front" />
      </div>
    </div>

    <div
      class="face face--back"
      :class="cardClass"
    >
      <div :class="sideClass">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, toRefs, withDefaults } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface Props {
  flipped: boolean,
  sideClass?: string
  cardClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  flipped: false, showOverlay: false,
  sideClass: undefined
})

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { flipped, sideClass } = toRefs(props)
const flipAngle = computed(() => flipped.value ? 180 : 0)
</script>


<style scoped lang="scss">
$flipAngleFront: calc(v-bind(flipAngle) * 1deg);
$flipAngleBack: calc(v-bind(flipAngle) * 1deg - 180deg);

.card {
  width: 100%;
  height: 100%;
  perspective: 2700px;

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