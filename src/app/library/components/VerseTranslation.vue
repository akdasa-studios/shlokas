<template>
  <div class="translation">
    {{ props.text }}
  </div>
</template>


<script lang="ts" setup>


const props = defineProps<{
  text: string,
}>()
</script>

<style scoped>
.translation {
  font-size: 1.2rem;
  line-height: 1.2;
}
</style>