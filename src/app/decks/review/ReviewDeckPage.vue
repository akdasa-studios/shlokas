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
        v-for="card, idx in vm.cards.value"
        :key="card.id.value.value"
        :index="idx"
        :card="(card as ReviewCardViewModel)"
        :swipe-directions="swipeDirections"
        :show-grade-buttons="showGradeButtons"
        @graded="onCardGraded"
      />

      <!-- Inbox deck is empty -->
      <ReviewDeckEmpty
        v-if="vm.count.value === 0"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed } from 'vue'
import { shlokas } from '@/application'
import { ReviewCard, ReviewCardViewModel, ReviewDeckEmpty } from '@/app/decks/review'

const vm = shlokas.reviewDeck
const showGradeButtons = shlokas.settings.showGradeButtons

const swipeDirections = computed(() => {
  return vm.cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['left', 'right']
})


function onCardGraded(grade: ReviewGrade) {
  setTimeout(() => {
    if (grade === ReviewGrade.Easy || grade === ReviewGrade.Good) {
      const first = vm.cards.value.shift()
      first?.review(grade)
    } else  {
      const first = vm.cards.value.shift()
      vm.cards.value.push(first)
    }
  }, 250)
}
</script>
