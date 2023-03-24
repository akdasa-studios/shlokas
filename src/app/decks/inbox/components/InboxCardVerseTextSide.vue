<template>
  <div class="number">
    {{ props.verseNumber }}
  </div>

  <VerseTextLines
    :lines="props.lines"
    :uri="uri"
    style="width: 100%;"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { VerseTextLines } from '@/app/decks/shared'
const props = defineProps<{
  verseNumber: string
  lines: string[]
  uri?: string|undefined
}>()
</script>
