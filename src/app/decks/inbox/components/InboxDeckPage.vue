<template>
  <ion-page
    :data-testid="testId('inboxPage')"
  >
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ $t('decks.inbox.title') }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
    >
      <CardsDeck
        v-if="userLearningCards.count > 0"
        v-slot="{ card }"
        :cards="cardsToShow"
        @place="onCardPlaced"
        @moving="onCardMoving"
        @moved="onCardMoved"
      >
        <InboxCard :card="(card as InboxCardViewModel)" />
      </CardsDeck>

      <InboxDeckEmpty
        v-else
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
import CardsDeck from '@/app/decks/CardsDeck.vue'
import { CardViewModel } from '@/app/decks/CardViewModel'
import { InboxCard, InboxCardViewModel, InboxDeckEmpty, UserLearningCards } from '@/app/decks/inbox'
import { StackedDeckBehaviour } from '@/app/decks/shared'
import { Vector3d } from '@/app/decks/Vector3d'
import { testId } from '@/app/TestId'

const app = inject('app') as Application

const userLearningCards = new UserLearningCards(app)
const deck = new StackedDeckBehaviour()
const cardsToShow = computed(() =>
  userLearningCards.cards.filter(x => x.index.value < 3)
)

userLearningCards.open()

function onCardPlaced(card: CardViewModel) {
  deck.updateInactiveCard(card)
}

function onCardMoving(card: CardViewModel, vector: Vector3d) {
  deck.updateMovingCard(card, vector)
}

function onCardMoved(card: CardViewModel, vector: Vector3d) {
  deck.updateMovedCard(card, vector)
  if (vector.length < deck.swipeThreshold) { return }
  setTimeout(() => {
    if (vector.direction == "left" || vector.direction == "right") {
      userLearningCards.shiftCard()
    } else if (vector.direction == "top" || vector.direction == "bottom") {
      userLearningCards.cardMemorized()
    }
  }, 250)
}

async function onRevert() {
  await userLearningCards.revert()
}
</script>
