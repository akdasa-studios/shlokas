<template>
  <FlipCard
    :index="props.index"
    :swipe-threshold="50"
    :swipe-directions="swipeDirections"
    @swiped="onTopCardSwiped"
    @swiping="onTopCardSwiping"
  >
    <template #overlay>
      <InboxCardProgressSide :state="progress" />
    </template>

    <template #front>
      <InboxCardVerseTextSide
        v-if="card.type === 'Text'"
        :verse-number="card.verseNumber"
        :lines="card.text"
      />

      <InboxCardTranslationSide
        v-if="card.type === 'Translation'"
        :verse-number="card.verseNumber"
        :translation="card.translation"
      />
    </template>

    <template #back>
      <InboxCardSynonymsSide :words="card.synonims" />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import FlipCard from '@/app/FlipCard.vue';
import {
  InboxCardProgressSide,
  InboxCardSynonymsSide,
  InboxCardVerseTextSide,
  InboxCardTranslationSide,
} from '@/app/inbox/views/cards';
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps<{
  index: number,
  card: any
}>()
const progress = ref<string>("")
const emit = defineEmits<{
  (event: 'swiped', direction: string): void
}>()

const swipeDirections = ['top', 'bottom', 'left', 'right']

function onTopCardSwiping(direction: string, value: number) {
  console.log(direction)
  progress.value =
    (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
    (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
}

function onTopCardSwiped(direction: string) {
  emit('swiped', direction)
}
</script>

<style scoped>
.front {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  border-bottom: 10px solid #ddd;
}
.number {
  text-transform: uppercase;
  background-color: lightblue;
  padding: .4em;
  margin: .4em;
  border-radius: .2em;
  font-size: 6vw;
}
</style>
