<template>
  <div
    v-for="line, idx in props.lines"
    :key="idx"
  >
    {{ line }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  lines: string[]
}>()
</script>