<template>
  <div>{{ props.translation }}</div>
</template>

<script setup lang="ts">

const props = defineProps<{
  translation: string,
}>()
</script>