<template>
  <FlipCard
    :data-testid="testId(props.card.verseNumber, 'card', props.card.type)"
    :data-index="props.card.index.value"
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
import { FlipCard } from '@/app/decks/shared'
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

</script>


<style src="@/app/decks/Card.scss" lang="scss" scoped />