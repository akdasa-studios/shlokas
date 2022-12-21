<template>
  <FlipCard
    :index="props.index"
    :swipe-threshold="50"
    :swipe-directions="props.swipeDirections"
    @swiped="onSwiped"
    @swiping="onSwiping"
  >
    <template #overlay>
      <ReviewCardSwipeOverlay :state="progress" />
    </template>

    <template #front>
      <CardSide>
        <div class="question">
          {{ getQuestion(card.type) }}
        </div>
        <component
          :is="getSideComponent(card.type, true)"
          :verse-number="card.verseNumber"
          :lines="card.text"
          :translation="card.translation"
        />
      </CardSide>
    </template>

    <template #back>
      <CardSide>
        <component
          :is="getSideComponent(card.type, false)"
          :verse-number="card.verseNumber"
          :lines="card.text"
          :translation="card.translation"
        />
      </CardSide>
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import FlipCard from '@/app/decks/FlipCard.vue'
import CardSide from '@/app/decks/CardSide.vue'
import {
  ReviewCardVerseNumberSide, ReviewCardTranslationSide,
  ReviewCardTextSide, ReviewCardSwipeOverlay
} from '@/app/decks/review/views'
import { defineEmits, defineProps, ref } from 'vue'

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

const progress = ref<number>(0)

function onSwiping(direction: string, value: number) {
  progress.value = value
  //  (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
  //  (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
}

function onSwiped(direction: string, value: number) {
  progress.value = ""
  return emit('swiped', direction, value)
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getSideComponent(cardType: string, front: boolean) {
  const name = cardType.split('To')[front ? 0 : 1]
  return {
    'Number': ReviewCardVerseNumberSide,
    'Text': ReviewCardTextSide,
    'Translation': ReviewCardTranslationSide
  }[name]
}

function getQuestion(cardType: string) {
  const name = cardType.split('To')[1]
  return {
    'Number': 'Number',
    'Text': 'Text',
    'Translation': 'Translation'
  }[name]
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

.question {
  background-color: aliceblue;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>
