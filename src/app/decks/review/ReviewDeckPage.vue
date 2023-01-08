<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title
          @click="shlokas.debug.nextDay()"
        >
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
        v-for="card, idx in cards"
        :key="card.id.value"
        :index="idx"
        :card="(card as unknown as ReviewCardViewModel)"
        :swipe-directions="swipeDirections"
        :show-grade-buttons="true"
        @graded="onCardGraded"
      />

      <!-- Inbox deck is empty -->
      <ReviewDeckEmpty v-if="count === 0" />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty } from '@/app/decks/review'
import { useReviewDeckStore } from './useReviewStore'

const app = inject('app') as Application
const reviewDeck = useReviewDeckStore(app)
const { cards, count } = storeToRefs(reviewDeck)
const { reviewTopCard, refresh } = reviewDeck

refresh()

const swipeDirections = computed(() => {
  return cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['left', 'right']
})


function onCardGraded(grade: ReviewGrade) {
  setTimeout(() => { reviewTopCard(grade) }, 250)
}
</script>
