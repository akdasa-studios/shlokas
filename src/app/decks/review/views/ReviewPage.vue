<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t('decks.review.title') }}</ion-title>
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
import { ReviewCard, ReviewEmpty } from '@/app/decks/review/views'
import { review } from '@/application'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const swipeDirections = computed(() => {
  return review.cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {

  setTimeout(() => {
    // if (!first) { return }
    // first.progress = ""
    if (direction == "left" || direction == "right") {
      const first = review.cards.value.shift()
      review.cards.value.push(first)
    } else if (direction == "top" || direction == "bottom") {
      console.log("well done")
    }
  }, 250)
}
</script>
