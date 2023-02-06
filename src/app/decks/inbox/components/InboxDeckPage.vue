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
        v-if="cardsMemorization.cards.length > 0"
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
        :buttons="[{ text: $t('common.revert'), role: 'cancel', handler: onRevert }]"
        :is-open="cardsMemorization.cardMemorizedToast.isOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="cardsMemorization.cardMemorizedToast.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonContent, IonHeader, IonPage, IonTitle,
  IonToast, IonToolbar
} from '@ionic/vue'
import { computed, inject } from 'vue'
import {
  CardsDeck , StackedDeckBehaviour, Vector3d, VerseCardViewModel,
  TutorialCard, TutorialCardViewModel
} from '@/app/decks/shared'
import {
  InboxCard, InboxCardViewModel, InboxDeckEmpty,
  InboxDeckTutorialController,
  InboxVerseCardViewModel,
  MemorizingStatus, InboxDeckCardsController
} from '@/app/decks/inbox'
import { testId } from '@/app/TestId'

const cardsMemorization = inject('CardMemorizationUseCase') as InboxDeckCardsController
const inboxDeckTutorial = inject('InboxDeckTutorialUseCase') as InboxDeckTutorialController

const deck = new StackedDeckBehaviour()

const cardsToShow = computed(() =>
  cardsMemorization.cards.filter(x => x.index < 3)
)

function onCardPlaced(card: VerseCardViewModel) {
  deck.updateInactiveCard(card)
}

function onCardMoving(
  card: InboxCardViewModel,
  deltaPos: Vector3d,
  deltaPosTotal: Vector3d
) {
  deck.updateMovingCard(card, deltaPos)

  if (card.type === "tutorial") { return }
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
    if (card.type === "tutorial") {
      inboxDeckTutorial.tutorialCardSwiped(card as TutorialCardViewModel)
      return
    }

    if (deltaPos.isLeftOrRight) {
      cardsMemorization.shiftTopCard()
    } else {
      cardsMemorization.memorizeTopCard()
    }
    card.memorizingStatus = MemorizingStatus.Unknown

    if (cardsMemorization.cards.length === 1) {
      onCardPlaced(cardsMemorization.topCard)
      cardsMemorization.topCard.showFrontSide()
    }
  }, 250)
}

async function onRevert() {
  await cardsMemorization.revert()
}
</script>
