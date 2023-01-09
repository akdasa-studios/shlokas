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
      <ReviewCard
        v-for="card, idx in userGradesCards.cards"
        :key="card.id.value"
        :index="idx"
        :card="(card as unknown as ReviewCardViewModel)"
        :swipe-directions="swipeDirections"
        :show-grade-buttons="true"
        @graded="onCardGraded"
      />

      <!-- Inbox deck is empty -->
      <ReviewDeckEmpty v-if="userGradesCards.count === 0" />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, inject } from 'vue'
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty, UserGradesCards } from '@/app/decks/review'

const app = inject('app') as Application
const userGradesCards = new UserGradesCards(app)
userGradesCards.open()

const swipeDirections = computed(() => {
  return userGradesCards.count > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['left', 'right']
})

function onCardGraded(grade: ReviewGrade) {
  setTimeout(() => { userGradesCards.gradeCard(grade) }, 250)
}
</script>
