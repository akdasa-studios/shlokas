<template>
  <div>
    {{ props.verseNumber }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  verseNumber: string
}>()
</script>

<style src="@/app/decks/Card.scss" lang="scss" scoped />