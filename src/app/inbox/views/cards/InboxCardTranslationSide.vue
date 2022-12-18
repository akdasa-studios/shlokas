<template>
  <CardSide>
    <div class="number">
      {{ props.verseNumber }}
    </div>
    <div>{{ props.translation }}</div>
  </CardSide>
</template>

<script setup lang="ts">
import CardSide from '@/app/CardSide.vue'
import { defineProps } from 'vue'
const props = defineProps<{
  translation: string,
  verseNumber: string
}>()
</script>