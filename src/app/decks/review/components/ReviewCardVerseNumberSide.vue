<template>
  <div class="number">
    {{ props.verseNumber }}
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  verseNumber: string
}>()
</script>
