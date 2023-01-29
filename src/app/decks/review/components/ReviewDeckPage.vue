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
        v-if="userGradesCards.count > 0"
        v-slot="data"
        :cards="cardsToShow"
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
          @graded="onCardGraded"
        />
      </CardsDeck>

      <!-- Inbox deck is empty -->
      <ReviewDeckEmpty
        v-else
        data-testid="reviewEmpty"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, inject } from 'vue'
import { CardsDeck, StackedDeckBehaviour, TutorialCard, TutorialCardViewModel, Vector3d, VerseCardViewModel } from '@/app/decks/shared'
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty, ReviewDeckTutorialUseCase, ReviewVerseCardViewModel, UserGradesCardsUseCase } from '@/app/decks/review'

const userGradesCards = inject('UserGradesCardsUseCase') as UserGradesCardsUseCase
const reviewDeckTutorial = inject('ReviewDeckTutorialUseCase') as ReviewDeckTutorialUseCase

const deck = new StackedDeckBehaviour()
const cardsToShow = computed(() =>
  userGradesCards.cards.filter(x => x.index < 3)
)

function onCardPlaced(card: VerseCardViewModel) {
  deck.updateInactiveCard(card)
}

function onCardMoving(card: ReviewCardViewModel, vector: Vector3d, vectorD: Vector3d) {
  if (card instanceof ReviewVerseCardViewModel) {
    card.grade = vectorD.length > deck.swipeThreshold
      ? getGrade(vectorD.direction)
      : undefined
  }
  deck.updateMovingCard(card, vector)
}

function onCardMoved(card: ReviewCardViewModel, vector: Vector3d) {
  if (card instanceof ReviewVerseCardViewModel) {
    card.grade = undefined
  }
  deck.updateMovedCard(card, vector)

  if (vector.length >= deck.swipeThreshold) {
    swipeCard(getGrade(vector.direction), card)
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
  deck.updateMovingCard(card, new Vector3d(-deck.swipeThreshold * 2, 0, 0))
  deck.updateMovedCard(card, new Vector3d(-deck.swipeThreshold, 0, 0))
  setTimeout(() => { userGradesCards.gradeTopCard(grade) }, 250)
  swipeCard(grade, card)
}

function swipeCard(grade: ReviewGrade, card: ReviewCardViewModel) {
  setTimeout(() => {
    if (card.type === "tutorial") {
      reviewDeckTutorial.tutorialCardSwiped(card as TutorialCardViewModel)
      return
    }

    userGradesCards.gradeTopCard(grade)
    if (userGradesCards.cards.length === 1) {
      onCardPlaced(userGradesCards.topCard)
      userGradesCards.topCard.showFrontSide()
    }
  }, 250)
}
</script>
