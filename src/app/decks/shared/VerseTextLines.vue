<template>
  <div class="root">
    <svg
      ref="svg"
      width="100%"
      height="100%"
    >
      <text
        v-for="line, idx in props.lines"
        :key="line"
        :y="getYPos(idx)"
        x="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        class="line"
      >
        {{ line }}
      </text>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps, ref } from "vue"

const props = defineProps<{
  lines: string[]
}>()

const svg = ref()
const FONT_SIZE = 15
const LINE_HEIGHT = 1.1
const MARGIN = 10

function getYPos(idx: number): number {
  return (MARGIN/2) + (FONT_SIZE * LINE_HEIGHT * (idx+1)) - (FONT_SIZE/2)
}

function recalculateSize() {
  var  bbox = svg.value.getBBox()
  svg.value.setAttribute("viewBox", `0 0 ${bbox.width+MARGIN} ${bbox.height+MARGIN}`)
  if (bbox.width === 0) { setTimeout(recalculateSize, 25) }
}

onMounted(() => {
  setTimeout(() => { recalculateSize() }, 1)
})
</script>

<style scoped>
.root {
  width: 100%;
}
.line {
  fill: var(--ion-color-light-contrast);
  font-size: 15px;
  font-style: italic;
}
</style>
