<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ $t('decks.review.title') }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
    >
      <CardsDeck
        v-if="!isEmpty"
        v-slot="data"
        :cards="cards"
        :compute-style="calculateStyle"
        class="deck"
        card-class="card1"
        @place="onCardPlaced"
        @moving="onCardMoving"
        @moved="onCardMoved"
      >
        <TutorialCard
          v-if="data.card.type === 'tutorial'"
          :card="(data.card as TutorialCardViewModel)"
        />
        <ReviewCard
          v-else
          :card="(data.card as ReviewVerseCardViewModel)"
        />
      </CardsDeck>

      <div
        :class="{ 'closed' : !showGradeButtons }"
        class="buttons"
      >
        <ReviewCardAnswerButtons
          :intervals="gradeButtonIntervals"
          @graded="onGradeButtonClicked"
        />
      </div>

      <!-- Inbox deck is empty -->
      <ReviewDeckEmpty
        v-show="isEmpty"
        data-testid="reviewEmpty"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, inject } from 'vue'
import { CardsDeck } from '@akdasa-studios/shlokas-uikit'
import { TutorialCard, TutorialCardViewModel, useStackedDeck, Vector3d, VerseCardViewModel } from '@/app/decks/shared'
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty, ReviewVerseCardViewModel, ReviewCardAnswerButtons, useReviewDeck, useReviewDeckTutorial } from '@/app/decks/review'
import { useAppearanceStore } from '@/app/settings'

const appearance = useAppearanceStore()
const app = inject('app') as Application

const {
  updateInactiveCard,
  updateMovingCard,
  updateMovedCard,
  swipeThreshold
} = useStackedDeck()
const {
  topCard, cards, isEmpty, gradeTopCard
} = useReviewDeck(app)
const {
  addTutorialCards,
  tutorialCardSwiped
} = useReviewDeckTutorial()

addTutorialCards()

const showGradeButtons = computed(() => {
  if (!appearance.gradeButtons) { return false }
  if (!topCard.value) { return false }
  // if (topCard.value.isTutorialCard) { return false }
  return topCard.value.flipped
})
const gradeButtonIntervals = computed(() => {
  const day = 1800
  if (!topCard.value) return [0, 0, 0, 0]
  if (topCard.value instanceof TutorialCardViewModel) { return [0, day, day*2, day*3] }
  return topCard.value.nextIntervals || [0, 0, 0, 0]
})

function onCardPlaced(card: VerseCardViewModel) {
  updateInactiveCard(card)
}

function onCardMoving(
  card: ReviewCardViewModel,
  start: [number, number],
  current: [number, number]
) {
  const dp = new Vector3d(current[0] - start[0], current[1] - start[1], 0)
  if (card instanceof ReviewVerseCardViewModel) {
    card.grade = dp.length > swipeThreshold
      ? getGrade(dp.direction)
      : undefined
  }
  updateMovingCard(card, dp)
}

function onCardMoved(
  card: ReviewCardViewModel,
  start: [number, number],
  current: [number, number]
) {
  const dp = new Vector3d(current[0] - start[0], current[1] - start[1], 0)
  if (card instanceof ReviewVerseCardViewModel) {
    card.grade = undefined
  }
  updateMovedCard(card, dp)

  if (dp.length >= swipeThreshold) {
    swipeCard(getGrade(dp.direction), card)
  }
}

function getGrade(direction: string) : ReviewGrade {
  return {
    'top': ReviewGrade.Forgot,
    'bottom': ReviewGrade.Hard,
    'left': ReviewGrade.Good,
    'right': ReviewGrade.Easy
  }[direction] as ReviewGrade
}

function onCardGraded(card: ReviewCardViewModel, grade: ReviewGrade) {
  updateMovingCard(card, new Vector3d(-swipeThreshold * 2, 0, 0))
  updateMovedCard(card, new Vector3d(-swipeThreshold, 0, 0))
  // setTimeout(() => { userGradesCards.gradeTopCard(grade) }, 250)
  swipeCard(grade, card)
}

function onGradeButtonClicked(grade: ReviewGrade) {
  onCardGraded(topCard.value, grade)
}

function swipeCard(grade: ReviewGrade, card: ReviewCardViewModel) {
  setTimeout(() => {
    if (card.type === 'tutorial') {
      tutorialCardSwiped(card as TutorialCardViewModel)
      return
    }

    card.showFrontSide()
    gradeTopCard(grade)
    if (cards.value.length === 1) {
      onCardPlaced(topCard.value)
    }
  }, 250)
}

function calculateStyle(card: any) {
  return card.style
}
</script>


<style scoped>
.buttons {
  width: 100%;
  position:absolute;
  bottom: 0px;
  background-color: rgba(var(--ion-color-light-rgb), .75);
  border-top: 1px solid var(--ion-color-light-shade);
  backdrop-filter: blur(5px);
  transition: .2s ease-in-out;
}
.closed {
  bottom: -50px;
  opacity: 0;
}
/deep/ .card1 {
  position: absolute;
  width: 100%;
  height: calc(100% - 10px);
}

.deck {
  width: 100%;
  height: 100%;
  perspective: 1300px;
}
</style>