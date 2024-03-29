<template>
  <FlipCard
    :data-testid="testId(verse.number.value, 'card', card.type)"
    :data-index="index"
    :flipped="props.flipped"
    :hue-color-hash="props.verse.number.value+card.type"
    side-class="side side-color-0"
    @click.stop="onCardFlipped"
  >
    <template #front>
      <div class="question">
        {{ $t(getQuestion(props.card.type)) }}
      </div>
      <component
        :is="getSideComponent(props.card.type, true)"
        :verse-number="props.verse.number.value"
        :lines="props.verse.text.lines"
        :translation="props.verse.translation.text"
      />
    </template>

    <template #back>
      <component
        :is="getSideComponent(props.card.type, false)"
        :verse-number="props.verse.number.value"
        :lines="props.verse.text.lines"
        :translation="props.verse.translation.text"
        :verse-image="props.image"
      />
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { ReviewCard, Verse, VerseImage } from '@akdasa-studios/shlokas-core'
import { testId } from '@/app/shared'
import { ReviewCardTextSide, ReviewCardTranslationSide, ReviewCardVerseNumberSide } from '@/app/decks/review'
import FlipCard from '@/app/decks/shared/components/FlipCard.vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: ReviewCard
  verse: Verse
  flipped: boolean
  index: number
  image?: VerseImage
}>()

const emit = defineEmits<{
  (event: 'flip'): void
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardFlipped() { emit('flip') }


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

type SideComponent = typeof ReviewCardVerseNumberSide | typeof ReviewCardTextSide | typeof ReviewCardTranslationSide

function getSideComponent(cardType: string, front: boolean) : SideComponent  {
  const name = cardType.split('To')[front ? 0 : 1]
  return {
    'Number': ReviewCardVerseNumberSide,
    'Text': ReviewCardTextSide,
    'Translation': ReviewCardTranslationSide
  }[name] as SideComponent
}

function getQuestion(cardType: string): string {
  const name = cardType.split('To')[1]
  return {
    'Number': 'cards.questions.number',
    'Text': 'cards.questions.text',
    'Translation': 'cards.questions.translation'
  }[name] || ''
}
</script>
