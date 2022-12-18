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
import CardSide from '@/app/decks/CardSide.vue'
import { defineProps } from 'vue'
const props = defineProps<{
  translation: string,
  verseNumber: string
}>()
</script>