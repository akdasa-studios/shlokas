<template>
  <CardSide>
    words
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
import CardSide from '@/app/CardSide.vue'
import { defineProps } from 'vue';
interface Word {
  word: string
  translation: string
}
const props = defineProps<{
  words: Word[]
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