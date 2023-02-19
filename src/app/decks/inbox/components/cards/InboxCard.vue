<template>
  <FlipCard
    :data-testid="testId(card.verseNumber, 'card', card.type)"
    :data-index="card.index"
    :flipped="props.card.flipped || false"
    @flip="props.card.flip()"
  >
    <template #overlay>
      <CardSide
        v-if="card.memorizingStatus !== MemorizingStatus.Unknown"
        :class="style"
      >
        <InboxCardSwipeOverlay
          :memorizing-status="card.memorizingStatus"
        />
      </CardSide>
    </template>

    <template #front>
      <CardSide :class="style">
        <InboxCardVerseTextSide
          v-if="card.type === InboxCardType.Text"
          :verse-number="card.verseNumber"
          :lines="card.text"
        />

        <InboxCardTranslationSide
          v-if="card.type === InboxCardType.Translation"
          :verse-number="card.verseNumber"
          :translation="card.translation"
        />
      </CardSide>
    </template>

    <template #back>
      <CardSide :class="style">
        <InboxCardSynonymsSide
          :words="card.synonyms"
        />
      </CardSide>
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { computed, defineProps, toRefs } from 'vue'
import { FlipCard, CardSide } from '@/app/decks/shared'
import {
  InboxCardSwipeOverlay, InboxCardSynonymsSide,
  InboxCardTranslationSide, InboxCardVerseTextSide,
  InboxVerseCardViewModel, MemorizingStatus
} from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import { useAppearanceStore } from '@/app/settings'
import { hashString } from '@/app/utils/hashString'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: InboxVerseCardViewModel
}>()
const { card } = toRefs(props)


/* -------------------------------------------------------------------------- */
/*                                  Behaviour                                 */
/* -------------------------------------------------------------------------- */

const appearance = useAppearanceStore()
const { colorfulCards } = toRefs(appearance)
const style = computed(() => {
  return colorfulCards.value
    ? 'side-color-' + (1+(hashString(props.card.verseNumber + props.card.type.toString()) % 8)).toString()
    : 'side-color-0'
  })
</script>


<style src="@/app/decks/Card.scss" lang="scss" scoped />