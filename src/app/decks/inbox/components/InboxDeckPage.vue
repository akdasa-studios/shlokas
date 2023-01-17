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
        @place="(c) => theme.updateInactiveCard(c)"
        @moving="(c,v) => theme.updateMovingCard(c,v)"
        @moved="(c,v) => { theme.updateMovedCard(c,v); onCardSwiped(c,v) }"
      >
        <InboxCard :card="(card as unknown as InboxCardViewModel)" />
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
import { InboxCard, InboxCardViewModel, InboxDeckEmpty, UserLearningCards } from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import CardsDeck from '@/app/decks/CardsDeck.vue'
import { StackedCardsDeckTheme } from '@/app/decks/shared'
import { CardViewModel } from '@/app/decks/CardViewModel'
import { Vector3d } from '@/app/decks/Vector3d'

const app = inject('app') as Application

const userLearningCards = new UserLearningCards(app)
const theme = new StackedCardsDeckTheme()
const cardsToShow = computed(() =>
  userLearningCards.cards.filter(x => x.index.value < 3)
)

userLearningCards.open()

function onCardSwiped(card: CardViewModel, vector: Vector3d) {
  if (vector.length < theme.swipeThreshold) { return }
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
