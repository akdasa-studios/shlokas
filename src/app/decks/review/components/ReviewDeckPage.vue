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
        <!-- <ReviewCard
          :key="card.id"
          :index="index"
          :card="(card as unknown as InboxCardViewModel)"
          :swipe-directions="swipeDirections"
          :show-grade-buttons="appearance.gradeButtons"
          @graded="onCardGraded"
        /> -->
        <!-- <InboxCard :card="card" /> -->
        <ReviewCard :card="(card as ReviewCardViewModel)" />
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
import { Application, ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, inject } from 'vue'
import CardsDeck from '@/app/decks/CardsDeck.vue'
import { CardViewModel } from '@/app/decks/CardViewModel'
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty, UserGradesCards } from '@/app/decks/review'
import { InboxCard } from '@/app/decks/inbox'
import { StackedDeckBehaviour } from '@/app/decks/shared'
import { Vector3d } from '@/app/decks/Vector3d'

const app = inject('app') as Application
const userGradesCards = new UserGradesCards(app)
userGradesCards.open()

const deck = new StackedDeckBehaviour()
const cardsToShow = computed(() =>
  userGradesCards.cards.filter(x => x.index.value < 3)
)

function onCardPlaced(card: CardViewModel) {
  deck.updateInactiveCard(card)
}

function onCardMoving(card: ReviewCardViewModel, vector: Vector3d, vectorD: Vector3d) {
  if (vectorD.length > deck.swipeThreshold) {
    card.grade.value = getGrade(vectorD.direction)
  }
  deck.updateMovingCard(card, vector)
}

function onCardMoved(card: ReviewCardViewModel, vector: Vector3d) {
  card.grade.value = undefined
  deck.updateMovedCard(card, vector)
  if (vector.length < deck.swipeThreshold) { return }
  setTimeout(() => {
    userGradesCards.gradeCard(getGrade(vector.direction))
  }, 250)
}

function getGrade(direction: string) : ReviewGrade {
  return {
    'top': ReviewGrade.Forgot,
    'bottom': ReviewGrade.Hard,
    'left': ReviewGrade.Good,
    'right': ReviewGrade.Easy
  }[direction] as ReviewGrade
}
</script>
