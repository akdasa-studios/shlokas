<template>
  <div>
    <DarkImage
      v-if="props.uri && imageUri"
      :src="imageUri"
      :is-dark="isDark"
      mode="invert"
    />

    <SVGTextLines
      v-else
      :lines="props.lines"
      :line-height="20"
      line-class="line"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, defineProps, ref } from 'vue'
import { DarkImage, SVGTextLines } from '@akdasa-studios/shlokas-uikit'
import { usePreferredDark } from '@vueuse/core'
import { useDownloadService } from '@/app/shared'

const props = defineProps<{
  lines: string[]
  uri?: string|undefined
}>()

const downloadService = useDownloadService()
const isDark = usePreferredDark()

const imageUri = ref('')

onMounted(async () => {
  if (props.uri) { imageUri.value = await downloadService.download(props.uri) }
})
</script>

<style scoped lang="scss">
/deep/ .line {
  font-family: Georgia;
  fill: var(--ion-color-light-contrast);
  font-size: 20px;
}
</style>
