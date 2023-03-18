<template>
  <div class="synonyms">
    <span
      v-for="synonym in props.synonyms"
      :key="synonym.word"
    >
      <span class="word">{{ synonym.word }}</span> –
      {{ synonym.translation }};
    </span>
  </div>
</template>


<script lang="ts" setup>
import { Synonym } from '@akdasa-studios/shlokas-core'
import { defineProps } from 'vue'

const props = defineProps<{
  synonyms: Synonym[],
}>()
</script>


<style scoped>
.synonyms {
  line-height: 1.2;
  font-size: 1.2rem;
}

.word {
  font-style: italic;
  font-weight: bold;
}
</style>