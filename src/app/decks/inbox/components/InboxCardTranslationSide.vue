<template>
  <!-- Number -->
  <div class="number">
    {{ props.verseNumber }}
  </div>

  <!-- Translation -->
  <div>{{ props.translation }}</div>
</template>

<script setup lang="ts">

const props = defineProps<{
  translation: string,
  verseNumber: string
}>()
</script>
