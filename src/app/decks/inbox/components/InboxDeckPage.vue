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
import CardsDeck from '@/app/decks/shared/CardsDeck.vue'
import { InboxCard, InboxCardViewModel, InboxDeckEmpty, MemorizingStatus, UserLearningCards } from '@/app/decks/inbox'
import { StackedDeckBehaviour, Vector3d, CardViewModel } from '@/app/decks/shared'
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

function onCardMoving(card: InboxCardViewModel, vector: Vector3d, vecotorD: Vector3d) {
  if (vecotorD.length > deck.swipeThreshold) {
    if (["left", "right"].includes(vecotorD.direction)) {
      card.memorizingStatus.value = MemorizingStatus.StillMemorizing
    } else {
      card.memorizingStatus.value = MemorizingStatus.Memorized
    }
  } else {
    card.memorizingStatus.value = MemorizingStatus.Unknown
  }
  deck.updateMovingCard(card, vector)
}

function onCardMoved(card: InboxCardViewModel, vector: Vector3d) {
  deck.updateMovedCard(card, vector)
  if (vector.length < deck.swipeThreshold) { return }
  setTimeout(() => {
    if (vector.direction == "left" || vector.direction == "right") {
      userLearningCards.shiftCard()
    } else if (vector.direction == "top" || vector.direction == "bottom") {
      userLearningCards.cardMemorized()
    }
    card.memorizingStatus.value = MemorizingStatus.Unknown
  }, 250)
}

async function onRevert() {
  await userLearningCards.revert()
}
</script>
