<template>
  <FlipCard
    :index="props.index"
    :swipe-threshold="50"
    :swipe-directions="props.swipeDirections"
    :data-testid="testId(verseNumber, 'card', type)"
    :data-index="props.index"
    @swiped="onSwiped"
    @swiping="onSwiping"
  >
    <template #overlay>
      <InboxCardSwipeOverlay :grade="grade" />
    </template>

    <template #front>
      <InboxCardVerseTextSide
        v-if="type === InboxCardType.Text"
        :verse-number="verseNumber"
        :lines="text"
      />

      <InboxCardTranslationSide
        v-if="type === InboxCardType.Translation"
        :verse-number="verseNumber"
        :translation="translation"
      />
    </template>

    <template #back>
      <InboxCardSynonymsSide :words="synonyms" />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { defineEmits, defineProps, toRefs } from 'vue'
import { InboxCardType } from '@akdasa-studios/shlokas-core'
import FlipCard from '@/app/decks/FlipCard.vue'
import {
  InboxCardSwipeOverlay, InboxCardSynonymsSide,
  InboxCardTranslationSide, InboxCardVerseTextSide
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

const {
  verseNumber, translation, synonyms, grade, type, text
} = toRefs(props.card)


/* -------------------------------------------------------------------------- */
/*                                 Handlers                                   */
/* -------------------------------------------------------------------------- */

function onSwiping(direction: string, value: number) {
  grade.value = (
    (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
    (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
  )
}

function onSwiped(direction: string, value: number) {
  setTimeout(() => grade.value = "" , 250)
  return emit('swiped', direction, value)
}
</script>


<style src="@/app/decks/Card.css" scoped />