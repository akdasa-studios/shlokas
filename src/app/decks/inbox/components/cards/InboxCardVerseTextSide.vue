<template>
  <CardSide>
    <!-- Number -->
    <div class="number">
      {{ props.verseNumber }}
    </div>

    <!-- Text -->
    <div
      v-for="line, idx in props.lines"
      :key="idx"
    >
      {{ line }}
    </div>
  </CardSide>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CardSide from '@/app/decks/CardSide.vue'
const props = defineProps<{
  verseNumber: string
  lines: string[]
}>()
</script>

<style src="@/app/decks/Card.scss" lang="scss" scoped />