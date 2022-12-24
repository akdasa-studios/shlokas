<template>
  <CardSide>
    <div
      v-for="word in props.words"
      :key="word.word"
      class="block"
    >
      <span class="word">
        {{ word.word }}
      </span>
      <span>{{ word.translation }}</span>
    </div>
  </CardSide>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue'
import CardSide from '@/app/decks/CardSide.vue'

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