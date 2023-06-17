<template>
  <div
    v-if="imageUri"
  >
    <DarkImage
      :src="imageUri"
      :is-dark="isDark"
      :class="$attrs.class"
      mode="invert"
    />
  </div>

  <div v-else>
    <SVGTextLines
      :lines="props.lines"
      :line-height="20"
      line-class="line"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { SVGTextLines } from '@akdasa-studios/shlokas-uikit'
import { usePreferredDark } from '@vueuse/core'
import { DarkImage, useDownloader, useEnv } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lines: string[]
  url?: string|undefined
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloadService = useDownloader()
const isDark = usePreferredDark()
const env = useEnv()

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
  if (props.url) {
    imageUri.value = await downloadService.download(env.getContentUrl(props.url))
  }
}
</script>

<style scoped>
:deep(.line) {
  font-family: Georgia;
  fill: var(--ion-color-light-contrast);
  font-size: 20px;
}

.image {
  padding: 3px;
}
</style>
