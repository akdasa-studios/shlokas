<template>
  <VerseTextLines
    :lines="props.lines"
    :url="verseImage?.url"
    style="width: 100%;"
    :class="{
      'image-portrait': (isPortrait || lines) && !props.verseImage,
      'image-landscape': !isPortrait && props.verseImage
    }"
  />
</template>

<script setup lang="ts">
import { VerseImage } from '@akdasa-studios/shlokas-core'
import { computed } from 'vue'
import VerseTextLines from '@/app/decks/shared/components/VerseTextLines.vue'
import { useScreenOrientation } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verseNumber: string
  lines: string[]
  verseImage?: VerseImage
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const screenOrientation = useScreenOrientation()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const isPortrait = computed(() => screenOrientation.isPortrait.value)
</script>


<style scoped>
:deep(.image-landscape) {
  max-height: 277px;
}
.image-portrait {
  width: 100%;
}
</style>