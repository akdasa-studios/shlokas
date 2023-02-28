<template>
  <div class="root">
    <DarkImage
      v-if="props.uri && localSvgUri"
      :src="localSvgUri"
      mode="invert"
    />

    <svg
      v-else
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

    <ion-spinner
      v-if="downloadService.isDownloading.value"
      class="spinner"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps, ref } from 'vue'
import { IonSpinner } from '@ionic/vue'
import { DarkImage, useDownloadService } from '@/app/shared'

const props = defineProps<{
  lines: string[]
  uri?: string|undefined
}>()

const downloadService = useDownloadService()

const svg = ref()
const FONT_SIZE = 15
const LINE_HEIGHT = 1.1
const MARGIN = 10
const localSvgUri = ref('')

function getYPos(idx: number): number {
  return (MARGIN/2) + (FONT_SIZE * LINE_HEIGHT * (idx+1)) - (FONT_SIZE/2)
}

function recalculateSize() {
  var  bbox = svg.value.getBBox()
  svg.value.setAttribute('viewBox', `0 0 ${bbox.width+MARGIN} ${bbox.height+MARGIN}`)
  if (bbox.width === 0) { setTimeout(recalculateSize, 25) }
}

onMounted(async () => {
  if (props.uri) {
    localSvgUri.value = await downloadService.download(props.uri)
  } else {
    setTimeout(() => { recalculateSize() }, 1)
  }
})
</script>

<style scoped>
.root {
  width: 100%;
  position: relative;
}
.line {
  fill: var(--ion-color-light-contrast);
  font-size: 15px;
  font-style: italic;
}

.spinner {
  position:absolute;
  bottom: 0%;
  right: 0%;
}
</style>
