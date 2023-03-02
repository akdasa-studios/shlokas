<template>
  <FlipCard
    :data-testid="testId(card.verseNumber, 'card', card.type)"
    :data-index="card.index"
    :flipped="props.card.flipped || false"
    :side-class="'side ' + style"
    card-class="padding"
    :show-overlay="card.memorizingStatus !== MemorizingStatus.Unknown"
    @click="props.card.flip()"
  >
    <template #overlay>
      <InboxCardSwipeOverlay
        :memorizing-status="card.memorizingStatus"
      />
    </template>

    <template #front>
      <InboxCardVerseTextSide
        v-if="card.type === InboxCardType.Text"
        :verse-number="card.verseNumber"
        :lines="card.text"
        :uri="card.textImageUri"
      />

      <InboxCardTranslationSide
        v-if="card.type === InboxCardType.Translation"
        :verse-number="card.verseNumber"
        :translation="card.translation"
      />
    </template>

    <template #back>
      <InboxCardSynonymsSide
        :words="card.synonyms"
      />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { computed, defineProps, toRefs } from 'vue'
import { FlipCard } from '@akdasa-studios/shlokas-uikit'
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


<style src="@/app/decks/Card.scss" lang="scss" />