<template>
  <CardSide>
    <!-- Number -->
    <div class="number">
      {{ props.verseNumber }}
    </div>

    <!-- Translation -->
    <div>{{ props.translation }}</div>
  </CardSide>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CardSide from '@/app/decks/CardSide.vue'
const props = defineProps<{
  translation: string,
  verseNumber: string
}>()
</script>

<style src="@/app/decks/Card.css" scoped />