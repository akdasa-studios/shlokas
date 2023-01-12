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
      <InboxCardSwipeOverlay
        :grade="grade"
        :class="props.card.style"
        class="side"
      />
    </template>

    <template #front>
      <InboxCardVerseTextSide
        v-if="props.card.type === InboxCardType.Text"
        :verse-number="props.card.verseNumber"
        :lines="props.card.text"
        class="side"
        :class="props.card.style"
      />

      <InboxCardTranslationSide
        v-if="props.card.type === InboxCardType.Translation"
        :verse-number="props.card.verseNumber"
        :translation="props.card.translation"
        :class="props.card.style"
        class="side"
      />
    </template>

    <template #back>
      <InboxCardSynonymsSide
        :words="props.card.synonyms"
        class="side"
        :class="props.card.style"
      />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'
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

const grade = ref('')

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
  // setTimeout(() => grade.value = "" , 250)
  return emit('swiped', direction, value)
}
</script>


<style src="@/app/decks/Card.scss" lang="scss" scoped />