<template>
  <CardSide>
    <div class="number">
      {{ props.verseNumber }}
    </div>

    <div
      v-for="line, idx in props.lines"
      :key="idx"
    >
      {{ line }}
    </div>
  </CardSide>
</template>

<script setup lang="ts">
import CardSide from '@/app/CardSide.vue'
import { defineProps } from 'vue'
const props = defineProps<{
  lines: string[]
  verseNumber: string
}>()
</script>