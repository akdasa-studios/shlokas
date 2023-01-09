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
      <InboxCardSwipeOverlay
        :grade="grade"
        :class="style"
        class="side"
      />
    </template>

    <template #front>
      <InboxCardVerseTextSide
        v-if="type === InboxCardType.Text"
        :verse-number="verseNumber"
        :lines="text"
        class="side"
        :class="style"
      />

      <InboxCardTranslationSide
        v-if="type === InboxCardType.Translation"
        :verse-number="verseNumber"
        :translation="translation"
        :class="style"
        class="side"
      />
    </template>

    <template #back>
      <InboxCardSynonymsSide
        :words="synonyms"
        class="side"
        :class="style"
      />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { defineEmits, defineProps, toRefs } from 'vue'
import { InboxCardType } from '@akdasa-studios/shlokas-core'
import FlipCard from '@/app/decks/FlipCard.vue'
import { testId } from '@/app/TestId'
import {
  InboxCardSwipeOverlay, InboxCardSynonymsSide,
  InboxCardTranslationSide, InboxCardVerseTextSide,
  InboxCardViewModel
} from '@/app/decks/inbox'

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
  verseNumber, translation, synonyms, grade, type, text, style
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


<style src="@/app/decks/Card.scss" lang="scss" scoped />