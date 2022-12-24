<template>
  <FlipCard
    :index="props.index"
    :swipe-threshold="50"
    :swipe-directions="props.swipeDirections"
    :data-testid="testId(props.card.verseNumber, 'card', props.card.type)"
    :data-index="props.index"
    @swiped="onSwiped"
    @swiping="onSwiping"
  >
    <template #overlay>
      <InboxCardSwipeOverlay :state="progress" />
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
      <InboxCardSynonymsSide :words="card.synonyms" />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
import FlipCard from '@/app/decks/FlipCard.vue'
import {
  InboxCardSwipeOverlay,
  InboxCardSynonymsSide,
  InboxCardVerseTextSide,
  InboxCardTranslationSide,
} from '@/app/decks/inbox/views/cards'
import { testId } from '@/app/TestId'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  index: number,
  swipeDirections: string[],
  card: {
    verseNumber: string,
    type: string,
    text: string[],
    translation: string,
    synonyms: { word: string, translation: string }[],
  }
}>()

const emit = defineEmits<{
  (event: 'swiped', direction: string, value: number): boolean
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const progress = ref<string>("")

function onSwiping(direction: string, value: number) {
  progress.value =
    (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
    (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
}

function onSwiped(direction: string, value: number) {
  progress.value = ""
  return emit('swiped', direction, value)
}
</script>

<style scoped>
/deep/ .number {
  text-transform: uppercase;
  background-color: lightblue;
  padding: .4em;
  margin: .4em;
  border-radius: .2em;
  font-size: 6vw;
}
</style>
