<template>
  <FlipCard
    :data-testid="testId(card.verseNumber, 'card', card.type)"
    :data-index="index"
    :flipped="flipped"
    :side-class="'side ' + style"
    card-class="padding"
    :show-overlay="showOverlay"
    @click="props.card.flip()"
  >
    <template #overlay>
      <InboxCardSwipeOverlay
        class="overlay"
        :memorizing-status="memorizingStatus"
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

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: InboxVerseCardViewModel
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { card } = toRefs(props)
const { flipped, index, memorizingStatus } = toRefs(card.value)
const showOverlay = computed(() => memorizingStatus.value !== MemorizingStatus.Unknown)


const appearance = useAppearanceStore()
const { colorfulCards } = toRefs(appearance)
const style = computed(() => { return colorfulCards.value ? props.card.color : 'side-color-0' })
</script>


<style src="@/app/decks/Card.scss" lang="scss" />