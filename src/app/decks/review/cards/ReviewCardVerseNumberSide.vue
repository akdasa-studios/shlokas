<template>
  <div class="number">
    {{ props.verseNumber }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  verseNumber: string
}>()
</script>

<style src="@/app/decks/Card.css" scoped />