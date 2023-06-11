<template>
  <!-- Number -->
  <div class="number">
    {{ props.verseNumber }}
  </div>

  <!-- Translation -->
  <div class="translation">
    {{ props.translation }}
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  translation: string,
  verseNumber: string
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const fontSize = computed(() => {
  return props.translation.length >= 300 ? '1.4rem' : '1.75rem'
})
</script>


<style scoped>
.translation {
  font-size: v-bind(fontSize);
  line-height: 1.2;
}
</style>