<template>
  <CardSide
    style="display: block; text-align: left;"
  >
    <span
      v-for="word in props.words"
      :key="word.word"
    >
      <b>{{ word.word }}</b> –
      {{ word.translation }};
    </span>
  </CardSide>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'
import { CardSide } from '@/app/decks/shared'

interface Synomym {
  word: string
  translation: string
}

const props = defineProps<{
  words: Synomym[]
}>()
</script>


<style scoped>
.block {
  margin: 2px;
  padding: 2px;
}

.word {
  font-weight: bold;
  margin-right: 10px;
}
</style>