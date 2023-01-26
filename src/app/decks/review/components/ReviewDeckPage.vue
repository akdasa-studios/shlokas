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
        v-slot="{ card }"
        :cards="cardsToShow"
        @place="onCardPlaced"
        @moving="onCardMoving"
        @moved="onCardMoved"
      >
        <ReviewCard
          :card="(card as ReviewCardViewModel)"
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
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty, UserGradesCardsUseCase } from '@/app/decks/review'
import { VerseCardViewModel, StackedDeckBehaviour, Vector3d, CardsDeck } from '@/app/decks/shared'

const userGradesCards = inject('UserGradesCardsUseCase') as UserGradesCardsUseCase
userGradesCards.open()

const deck = new StackedDeckBehaviour()
const cardsToShow = computed(() =>
  userGradesCards.cards.filter(x => x.index < 3)
)

function onCardPlaced(card: VerseCardViewModel) {
  deck.updateInactiveCard(card)
}

function onCardMoving(card: ReviewCardViewModel, vector: Vector3d, vectorD: Vector3d) {
    card.grade = vectorD.length > deck.swipeThreshold
      ? getGrade(vectorD.direction)
      : undefined
  deck.updateMovingCard(card, vector)
}

function onCardMoved(card: ReviewCardViewModel, vector: Vector3d) {
  card.grade = undefined
  deck.updateMovedCard(card, vector)
  if (vector.length < deck.swipeThreshold) { return }
  swipeCard(getGrade(vector.direction))
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
  swipeCard(grade)
}

function swipeCard(grade: ReviewGrade) {
  setTimeout(() => {
    userGradesCards.gradeTopCard(grade)
    if (userGradesCards.cards.length === 1) {
      onCardPlaced(userGradesCards.topCard)
      userGradesCards.topCard.showFrontSide()
    }
  }, 250)
}
</script>
