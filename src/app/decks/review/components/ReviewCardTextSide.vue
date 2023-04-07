<template>
  <VerseTextLines
    :lines="props.lines"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import VerseTextLines from '@/app/decks/shared/components/VerseTextLines.vue'
const props = defineProps<{
  lines: string[]
}>()
</script>