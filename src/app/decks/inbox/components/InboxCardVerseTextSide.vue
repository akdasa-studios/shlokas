<template>
  <div class="number">
    {{ props.verseNumber }}
  </div>

  <VerseTextLines
    :lines="props.lines"
    :url="verseImage?.url"
    style="width: 277px;"
  />

  <!-- <div
    style="
      width:100%;height:100%;background-color: aqua;
      background-image: url(https://shlokas.app/content/verse-image-c52cb4b5-82b9-5d1f-85e9-b5e0455702fe-default.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
      "
  /> -->
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

<!--

      style="
      width:100%;height:100%;background-color: aqua;
      background-image: url(https://shlokas.app/content/verse-image-c52cb4b5-82b9-5d1f-85e9-b5e0455702fe-default.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
      "

-->

<!--
  background-image: url(https://shlokas.app/content/verse-image-c52cb4b5-82b9-5d1f-85e9-b5e0455702fe-default.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
-->