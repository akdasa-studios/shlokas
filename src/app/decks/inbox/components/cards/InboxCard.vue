<template>
  <FlipCard
    :data-testid="testId(props.card.verseNumber, 'card', props.card.type)"
  >
    <template #overlay>
      <InboxCardSwipeOverlay
        grade=""
        :class="style"
        class="side"
      />
    </template>

    <template #front>
      <InboxCardVerseTextSide
        v-if="props.card.type === InboxCardType.Text"
        :verse-number="props.card.verseNumber"
        :lines="props.card.text"
        class="side"
        :class="style"
      />

      <InboxCardTranslationSide
        v-if="props.card.type === InboxCardType.Translation"
        :verse-number="props.card.verseNumber"
        :translation="props.card.translation"
        :class="style"
        class="side"
      />
    </template>

    <template #back>
      <InboxCardSynonymsSide
        :words="props.card.synonyms"
        class="side"
        :class="style"
      />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { defineProps } from 'vue'
import FlipCard from '@/app/decks/FlipCard.vue'
import {
  InboxCardSwipeOverlay, InboxCardSynonymsSide,
  InboxCardTranslationSide, InboxCardVerseTextSide,
  InboxCardViewModel
} from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import { useAppearanceStore } from '@/app/settings'
import { hashString } from '@/app/utils/hashString'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: InboxCardViewModel
}>()


const appearance = useAppearanceStore()
const style = appearance.colorfulCards
  ? "side-color-" + (1+(hashString(props.card.verseNumber + props.card.type.toString()) % 8)).toString()
  : "side-color-0"

// const emit = defineEmits<{
//   (event: 'swiped', direction: string, value: number): boolean
// }>()

// const grade = ref('')

// /* -------------------------------------------------------------------------- */
// /*                                 Handlers                                   */
// /* -------------------------------------------------------------------------- */

// function onSwiping(direction: string, value: number) {
//   grade.value = (
//     (direction === "top"  || direction === "bottom") && value !== 0 ? "finished" :
//     (direction === "left" || direction === "right")  && value !== 0 ? "inProgress" : ""
//   )
// }

// function onSwiped(direction: string, value: number) {
//   setTimeout(() => grade.value = "" , 50)
//   return emit('swiped', direction, value)
// }
</script>


<style src="@/app/decks/Card.scss" lang="scss" scoped />