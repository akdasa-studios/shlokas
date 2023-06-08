<template>
  <div class="number">
    {{ props.verseNumber }}
  </div>

  <VerseTextLines
    :lines="props.lines"
    :url="verseImage?.url"
    style="width: 100%;"
  />
</template>

<script setup lang="ts">
import { VerseImage } from '@akdasa-studios/shlokas-core'
import VerseTextLines from '@/app/decks/shared/components/VerseTextLines.vue'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verseNumber: string
  lines: string[]
  verseImage?: VerseImage
}>()
</script>
