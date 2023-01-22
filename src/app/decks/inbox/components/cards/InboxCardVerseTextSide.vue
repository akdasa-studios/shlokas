<template>
  <div class="number">
    {{ props.verseNumber }}
  </div>

  <VerseTextLines
    :lines="props.lines"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { VerseTextLines } from '@/app/decks/shared'
const props = defineProps<{
  verseNumber: string
  lines: string[]
}>()
</script>

<style src="@/app/decks/Card.scss" lang="scss" scoped />