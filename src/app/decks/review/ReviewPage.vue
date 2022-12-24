<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('decks.review.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
      color="light"
    >
      <ReviewCard
        v-for="card, idx in review.cards.value"
        :key="card.id.value"
        :index="idx"
        :card="card"
        :swipe-directions="swipeDirections"
        @swiped="onCardSwiped"
      />

      <!-- Inbox deck is empty -->
      <ReviewEmpty
        v-if="review.count.value === 0"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { ReviewGrade } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed } from 'vue'
import { review } from '@/application'
import { ReviewCard, ReviewEmpty } from '@/app/decks/review'

const swipeDirections = computed(() => {
  return review.cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['left', 'right']
})

function onCardSwiped(direction: string) {
  setTimeout(() => {
    if (direction == "left" || direction == "right") {
      const first = review.cards.value.shift()
      first?.review(direction === "left" ? ReviewGrade.Good : ReviewGrade.Easy)
      console.log("well done")
    } else if (direction == "top" || direction == "bottom") {
      const first = review.cards.value.shift()
      review.cards.value.push(first)
    }
  }, 250)
}
</script>
