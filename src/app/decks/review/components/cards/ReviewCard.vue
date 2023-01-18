<template>
  <FlipCard
    :data-testid="testId(props.card.verseNumber, 'card', props.card.type)"
    :data-index="props.card.index.value"
  >
    <template #overlay>
      <ReviewCardSwipeOverlay
        :grade="props.card.grade.value"
        :interval="nextIntervals[props.card.grade.value || 0]"
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
        <!-- <div
          v-if="showGradeButtons"
          class="buttons"
        >
          <ReviewCardAnswerButtons
            :intervals="nextIntervals"
            @graded="onGradeButtonClicked"
          />
        </div> -->
      </CardSide>
    </template>
  </FlipCard>
</template>


<script lang="ts" setup>
import { ReviewGrade } from '@akdasa-studios/shlokas-core'
import { defineEmits, defineProps, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import FlipCard from '@/app/decks/FlipCard.vue'
import CardSide from '@/app/decks/CardSide.vue'
import {
  ReviewCardVerseNumberSide, ReviewCardTranslationSide,
  ReviewCardTextSide, ReviewCardSwipeOverlay, ReviewCardAnswerButtons, ReviewCardViewModel
} from '@/app/decks/review'
import { testId } from '@/app/TestId'
import { useAppearanceStore } from '@/app/settings'
import { hashString } from '@/app/utils/hashString'

const { t } = useI18n()

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: ReviewCardViewModel,
}>()

// const emit = defineEmits<{
//   (event: 'graded', grade: ReviewGrade): boolean
// }>()

const { card: { value: {
  verseNumber, translation, nextIntervals,
  type, text
}}} = toRefs(props)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const appearance = useAppearanceStore()
const style = appearance.colorfulCards
  ? "side-color-" + (1+(hashString(props.card.verseNumber + props.card.type.toString()) % 8)).toString()
  : "side-color-0"

// const grade = ref<ReviewGrade|undefined>(undefined)

// function getGrade(direction: string) : ReviewGrade|undefined {
//   return {
//     'top': ReviewGrade.Forgot,
//     'bottom': ReviewGrade.Hard,
//     'left': ReviewGrade.Good,
//     'right': ReviewGrade.Easy
//   }[direction]
// }

// function onSwiping(direction: string, value: number) {
//   if (Math.abs(value) < 30) { grade.value = undefined; return }
//   grade.value = getGrade(direction)
// }

// function onSwiped(direction: string) {
//   grade.value = undefined
//   return emit('graded', getGrade(direction))
// }

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

// function onGradeButtonClicked(grade: ReviewGrade) {
//   // targetX.value = -500
//   // setTimeout(() => { targetX.value = 0 }, 400)
//   props.card.swipeAway()
//   // return emit('graded', grade)
// }

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


<style src="@/app/decks/Card.scss" lang="scss" scoped />

<style scoped>
.buttons {
  width: 100%;
  position:absolute;
  bottom:10px;
}
</style>