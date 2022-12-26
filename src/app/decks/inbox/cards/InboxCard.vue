<template>
  <FlipCard
    :index="props.index"
    :swipe-threshold="50"
    :swipe-directions="props.swipeDirections"
    :data-testid="testId(props.card.verseNumber.value, 'card', props.card.type.value)"
    :data-index="props.index"
    @swiped="onSwiped"
    @swiping="onSwiping"
  >
    <template #overlay>
      <InboxCardSwipeOverlay :state="props.card.grade.value" />
    </template>

    <template #front>
      <InboxCardVerseTextSide
        v-if="props.card.type.value === 'Text'"
        :verse-number="props.card.verseNumber.value"
        :lines="props.card.text.value"
      />

      <InboxCardTranslationSide
        v-if="props.card.type.value === 'Translation'"
        :verse-number="props.card.verseNumber.value"
        :translation="props.card.translation.value"
      />
    </template>

    <template #back>
      <InboxCardSynonymsSide :words="props.card.synonyms.value" />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import FlipCard from '@/app/decks/FlipCard.vue'
import {
  InboxCardSwipeOverlay,
  InboxCardSynonymsSide, InboxCardTranslationSide, InboxCardVerseTextSide
} from '@/app/decks/inbox/cards'
import { testId } from '@/app/TestId'
import { InboxCardViewModel } from './InboxCardViewModel'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  index: number,
  swipeDirections: string[],
  card: InboxCardViewModel
}>()

const emit = defineEmits<{
  (event: 'swiped', direction: string, value: number): boolean
}>()


/* -------------------------------------------------------------------------- */
/*                                 Handlers                                   */
/* -------------------------------------------------------------------------- */

function onSwiping(direction: string, value: number) {
  props.card.setGrade(
    (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
    (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
  )
}

function onSwiped(direction: string, value: number) {
  setTimeout(() => props.card.setGrade("") , 250)
  return emit('swiped', direction, value)
}
</script>


<style src="@/app/decks/Card.css" scoped />