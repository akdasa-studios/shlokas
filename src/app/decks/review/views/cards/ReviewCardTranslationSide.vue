<template>
  <div>{{ props.translation }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  translation: string,
}>()
</script>