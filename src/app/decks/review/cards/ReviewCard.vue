<template>
  <FlipCard
    :index="props.index"
    :swipe-threshold="50"
    :swipe-directions="props.swipeDirections"
    @swiped="onSwiped"
    @swiping="onSwiping"
  >
    <template #overlay>
      <ReviewCardSwipeOverlay
        :grade="grade"
        :interval="interval"
      />
    </template>

    <template #front>
      <CardSide>
        <div class="question">
          {{ getQuestion(card.type) }}
        </div>
        <component
          :is="getSideComponent(card.type, true)"
          :verse-number="card.verseNumber"
          :lines="card.text"
          :translation="card.translation"
        />
      </CardSide>
    </template>

    <template #back>
      <CardSide>
        <component
          :is="getSideComponent(card.type, false)"
          :verse-number="card.verseNumber"
          :lines="card.text"
          :translation="card.translation"
        />
      </CardSide>
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { ReviewGrade, Scheduler } from '@akdasa-studios/shlokas-core'
import { defineEmits, defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FlipCard from '@/app/decks/FlipCard.vue'
import CardSide from '@/app/decks/CardSide.vue'
import {
  ReviewCardVerseNumberSide, ReviewCardTranslationSide,
  ReviewCardTextSide, ReviewCardSwipeOverlay
} from '@/app/decks/review'

const { t } = useI18n()

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  index: number,
  swipeDirections: string[],
  card: {
    verseNumber: string,
    type: string,
    text: string[],
    translation: string,
    synonyms: { word: string, translation: string }[],
    interval: number,
    ease: number,
  }
}>()

const emit = defineEmits<{
  (event: 'graded', direction: string): boolean
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const grade = ref<string>("")
const interval = ref<number>(0)

function getGrade(direction: string) : ReviewGrade {
  return {
    'top': ReviewGrade.Forgot,
    'bottom': ReviewGrade.Hard,
    'left': ReviewGrade.Good,
    'right': ReviewGrade.Easy
  }[direction] || ReviewGrade.Forgot
}

function onSwiping(direction: string, value: number) {
  if (Math.abs(value) < 30) { grade.value = ""; return }
  grade.value = ReviewGrade[getGrade(direction)].toLocaleLowerCase()

  interval.value = new Scheduler().getNewInterval(
    props.card.interval, props.card.ease / 100, getGrade(direction)
  )
}

function onSwiped(direction: string) {
  grade.value = ""
  return emit('graded', ReviewGrade[getGrade(direction)])
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

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


<style src="@/app/decks/Card.css" scoped />