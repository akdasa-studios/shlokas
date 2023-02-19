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
        v-if="!isEmpty"
        v-slot="data"
        :cards="cardsToShow"
        @place="onCardPlaced"
        @moving="onCardMoving"
        @moved="onCardMoved"
      >
        <TutorialCard
          v-if="data.card.type === 'tutorial'"
          :card="(data.card as TutorialCardViewModel)"
        />
        <InboxCard
          v-else
          :card="(data.card as InboxVerseCardViewModel)"
        />
      </CardsDeck>

      <InboxDeckEmpty
        v-else
        data-testid="inboxEmpty"
      />

      <ion-toast
        position="top"
        :message="$t('cards.memorized')"
        :buttons="[{ text: $t('common.revert'), role: 'cancel', handler: revert }]"
        :is-open="cardMemorizedToast.isOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="cardMemorizedToast.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonPage, IonTitle,
  IonToast, IonToolbar
} from '@ionic/vue'
import { inject } from 'vue'
import { Application } from '@akdasa-studios/shlokas-core'
import {
  CardsDeck , StackedDeckBehaviour, Vector3d, VerseCardViewModel,
  TutorialCard, TutorialCardViewModel
} from '@/app/decks/shared'
import {
  InboxCard, InboxCardViewModel, InboxDeckEmpty,
  InboxDeckTutorialController,
  InboxVerseCardViewModel,
  MemorizingStatus, useInboxDeck
} from '@/app/decks/inbox'
import { testId } from '@/app/TestId'

const app = inject('app') as Application

const { isEmpty, cardsToShow, cardMemorizedToast, shiftTopCard, memorizeTopCard, topCard, revert } = useInboxDeck(app)
const inboxDeckTutorial = inject('inboxDeckTutorialController') as InboxDeckTutorialController

const deck = new StackedDeckBehaviour()



function onCardPlaced(card: VerseCardViewModel) {
  deck.updateInactiveCard(card)
}

function onCardMoving(
  card: InboxCardViewModel,
  deltaPos: Vector3d,
  deltaPosTotal: Vector3d
) {
  deck.updateMovingCard(card, deltaPos)

  if (card.type === 'tutorial') { return }
  if (deltaPosTotal.length < deck.swipeThreshold) {
    card.memorizingStatus = MemorizingStatus.Unknown
  } else {
    card.memorizingStatus = deltaPosTotal.isLeftOrRight
      ? MemorizingStatus.StillMemorizing
      : MemorizingStatus.Memorized
  }
}

function onCardMoved(card: InboxCardViewModel, deltaPos: Vector3d) {
  deck.updateMovedCard(card, deltaPos)
  if (deltaPos.length < deck.swipeThreshold) { return }
  setTimeout(() => {
    if (card.type === 'tutorial') {
      inboxDeckTutorial.tutorialCardSwiped(card as TutorialCardViewModel)
      return
    }

    if (deltaPos.isLeftOrRight) {
      shiftTopCard()
    } else {
      memorizeTopCard()
    }
    card.memorizingStatus = MemorizingStatus.Unknown

    if (cardsToShow.value.length === 1) {
      onCardPlaced(topCard.value)
      topCard.value.showFrontSide()
    }
  }, 250)
}
</script>
