<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      class="background"
    />

    <circle
      cx="10"
      cy="10"
      r="8"
      class="progress"
      :style="`stroke-dashoffset: ${progress}`"
    />

    <text
      v-if="showNumbers"
      class="text"
      x="50%"
      y="45%"
    >
      {{ current }}
    </text>
    <line
      v-if="showNumbers"
      class="line"
      x1="5"
      y1="10"
      x2="15"
      y2="10"
    />
    <text
      v-if="showNumbers"
      class="text"
      x="50%"
      y="65%"
    >
      {{ total }}
    </text>
  </svg>
</template>


<script lang="ts" setup>
import { defineProps, computed } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  progress: number
  current?: number
  total?: number
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const progress = computed(() => 50 + props.progress * 51)
const showNumbers = computed(() => props.current != undefined && props.total !== undefined)
</script>


<style lang="scss" scoped>
$progress-bar-stroke-width: 1.5;
$progress-bar-size: 300px;

svg {
  height: $progress-bar-size;
  width: $progress-bar-size;
}

.background {
  fill: none;
  stroke: var(--ion-color-cards-tint);
  stroke-width: $progress-bar-stroke-width;
}

.progress {
  fill: none;
  stroke: var(--ion-color-cards-shade);
  stroke-dasharray: 100 100;
  stroke-dashoffset: 100;
  stroke-linecap: round;
  stroke-width: $progress-bar-stroke-width;
  transition: stroke-dashoffset 1.5s ease-out;
}

.line {
  stroke: var(--ion-color-cards-shade);
  stroke-linecap: round;
  stroke-width: $progress-bar-stroke-width/4;
}

.text {
  font-size: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  text-anchor: middle;
  fill: var(--ion-color-light-contrast);
}
</style>