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
        v-slot="{ card, index }"
        :cards="userGradesCards.cards"
        :show-cards="3"
      >
        <ReviewCard
          :key="card.id"
          :index="index"
          :card="(card as unknown as InboxCardViewModel)"
          :swipe-directions="swipeDirections"
          :show-grade-buttons="appearance.gradeButtons"
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
import { Application, ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, inject } from 'vue'
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty, UserGradesCards } from '@/app/decks/review'
import { useAppearanceStore } from '@/app/settings'
import CardsDeck from '@/app/decks/CardsDeck.vue'

const app = inject('app') as Application
const userGradesCards = new UserGradesCards(app)
const appearance = useAppearanceStore()
userGradesCards.open()

const swipeDirections = computed(() => {
  return userGradesCards.count > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['left', 'right']
})

function onCardGraded(grade: ReviewGrade) {
  setTimeout(() => { userGradesCards.gradeCard(grade) }, 100)
}
</script>
