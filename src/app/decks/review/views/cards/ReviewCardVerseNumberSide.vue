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