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
          :card="(data.card as InboxCardViewModel)"
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
import {
  IonContent, IonHeader, IonPage, IonTitle,
  IonToast, IonToolbar
} from '@ionic/vue'
import { computed, inject } from 'vue'
import {
  CardsDeck , StackedDeckBehaviour, Vector3d, VerseCardViewModel
} from '@/app/decks/shared'
import {
  InboxCard, InboxCardViewModel, InboxDeckEmpty,
  MemorizingStatus, TutorialCard, TutorialCardViewModel, UserMemorizingCardsScenario
} from '@/app/decks/inbox'
import { testId } from '@/app/TestId'

const userLearningCards = new UserMemorizingCardsScenario(inject('app') as Application)

const deck = new StackedDeckBehaviour()

const cardsToShow = computed(() =>
  userLearningCards.cards.filter(x => x.index.value < 3)
)

userLearningCards.open()

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
    card.memorizingStatus.value = MemorizingStatus.Unknown
  } else {
    card.memorizingStatus.value = deltaPosTotal.isLeftOrRight
      ? MemorizingStatus.StillMemorizing
      : MemorizingStatus.Memorized
  }
}

function onCardMoved(card: InboxCardViewModel, deltaPos: Vector3d) {
  deck.updateMovedCard(card, deltaPos)
  if (deltaPos.length < deck.swipeThreshold) { return }
  setTimeout(() => {
    if (deltaPos.isLeftOrRight) {
      userLearningCards.shiftCard()
    } else {
      if (card.type !== "tutorial") {
        userLearningCards.cardMemorized()
      } else {
        userLearningCards.removeCard()
      }
    }
    if (card.type !== "tutorial") {
      card.memorizingStatus.value = MemorizingStatus.Unknown
      return
    }
  }, 250)
}

async function onRevert() {
  await userLearningCards.revert()
}
</script>
