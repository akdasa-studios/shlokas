<template>
  <div>
    <DarkImage
      v-if="imageUri"
      :src="imageUri"
      :is-dark="isDark"
      mode="invert"
      class="image"
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

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lines: string[]
  uri?: string|undefined
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloadService = useDownloadService()
const isDark = usePreferredDark()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const imageUri = ref('')


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  if (props.uri) { imageUri.value = await downloadService.download(props.uri) }
}
</script>

<style scoped>
:deep(.line) {
  font-family: Georgia;
  fill: var(--ion-color-light-contrast);
  font-size: 20px;
}

.image {
  padding: .5rem;
}
</style>
