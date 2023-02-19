<template>
  <FlipCard
    :data-testid="testId(props.card.verseNumber, 'card', props.card.type)"
    :data-index="props.card.index"
    :flipped="props.card.flipped"
    @flip="props.card.flip()"
  >
    <template #overlay>
      <ReviewCardSwipeOverlay
        :grade="props.card.grade"
        :interval="nextIntervals[props.card.grade || 0]"
        :class="style"
        class="side"
      />
    </template>

    <template #front>
      <CardSide
        class="side"
        :class="style"
      >
        <div class="question">
          {{ getQuestion(type) }}
        </div>
        <component
          :is="getSideComponent(type, true)"
          :verse-number="verseNumber"
          :lines="text"
          :translation="translation"
        />
      </CardSide>
    </template>

    <template #back>
      <CardSide
        class="side"
        :class="style"
      >
        <component
          :is="getSideComponent(type, false)"
          :verse-number="verseNumber"
          :lines="text"
          :translation="translation"
        />
      </CardSide>
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { computed, defineProps, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ReviewCardSwipeOverlay, ReviewCardTextSide, ReviewCardTranslationSide,
  ReviewCardVerseNumberSide, ReviewVerseCardViewModel
} from '@/app/decks/review'
import { CardSide, FlipCard } from '@/app/decks/shared'
import { useAppearanceStore } from '@/app/settings'
import { testId } from '@/app/TestId'
import { hashString } from '@/app/utils/hashString'

const { t } = useI18n()

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: ReviewVerseCardViewModel,
}>()

const { card: { value: {
  verseNumber, translation, nextIntervals,
  type, text
}}} = toRefs(props)

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const appearance = useAppearanceStore()
const { colorfulCards } = toRefs(appearance)
const style = computed(() => {
  return colorfulCards.value
    ? 'side-color-' + (1+(hashString(props.card.verseNumber + props.card.type.toString()) % 8)).toString()
    : 'side-color-0'
  })

function getSideComponent(cardType: string, front: boolean) {
  const name = cardType.split('To')[front ? 0 : 1]
  return {
    'Number': ReviewCardVerseNumberSide,
    'Text': ReviewCardTextSide,
    'Translation': ReviewCardTranslationSide
  }[name]
}

function getQuestion(cardType: string) {
  const name = cardType.split('To')[1]
  return {
    'Number': t('cards.questions.number'),
    'Text': t('cards.questions.text'),
    'Translation': t('cards.questions.translation')
  }[name]
}
</script>


<style src="@/app/decks/Card.scss" lang="scss" scoped />

