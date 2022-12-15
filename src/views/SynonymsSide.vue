<template>
  <div class="back">
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
  </div>
</template>


<script lang="ts" setup>
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
.back {
  background-color: white;
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */
  /* gap: 0px; */
  /* flex-wrap: wrap; */
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 5vw;
  text-align: center;

  border-radius: 8px;
  /* border: 1px solid #ddd; */
  /* border-bottom: 10px solid #ddd; */
}

.block {
  margin: 2px;
  padding: 2px;
}

.word {
  font-weight: bold;
  margin-right: 10px;
}
</style>