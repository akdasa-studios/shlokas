<template>
  <ion-page
    :data-testid="testId('inboxPage')"
  >
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('decks.inbox.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
    >
      <CardsDeck>
        <InboxCard
          v-for="card, idx in userLearningCards.cards.slice(0, 3)"
          :key="card.id.value"
          :index="idx"
          :card="(card as unknown as InboxCardViewModel)"
          :swipe-directions="swipeDirections"
          @swiped="onCardSwiped"
        />
      </CardsDeck>

      <InboxDeckEmpty
        v-if="userLearningCards.count === 0"
        data-testid="inboxEmpty"
      />

      <ion-toast
        position="top"
        :message="$t('cards.memorized')"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: onRevert }]"
        :is-open="userLearningCards.cardMemorizedToast.isOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="userLearningCards.cardMemorizedToast.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import { computed, inject } from 'vue'
import { InboxCard, InboxCardViewModel, InboxDeckEmpty, UserLearningCards } from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import CardsDeck from '@/app/decks/CardsDeck.vue'

const app = inject('app') as Application
const userLearningCards = new UserLearningCards(app)
userLearningCards.open()

const swipeDirections = computed(() => {
  return userLearningCards.count > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {
  setTimeout(() => {
    if (direction == "left" || direction == "right") {
      userLearningCards.shiftCard()
    } else if (direction == "top" || direction == "bottom") {
      userLearningCards.cardMemorized()
    }
  }, 100)
}

async function onRevert() {
  await userLearningCards.revert()
}
</script>
