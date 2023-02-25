<template>
  <ion-page :data-testid="testId('inboxPage')">
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

      <div
        :class="{ 'closed': !showPlayer }"
        class="player"
      >
        <VersePlayer
          :uri="(topCard as InboxVerseCardViewModel)?.textAudioUri"
          :title="(topCard as InboxVerseCardViewModel)?.verseNumber"
          :artist="$t('app.name')"
          :show-progress-bar="true"
          :show-repeat-button="true"
        />
      </div>

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
import { inject, computed } from 'vue'
import { Application } from '@akdasa-studios/shlokas-core'
import {
  CardsDeck, Vector3d, VerseCardViewModel,
  TutorialCard, TutorialCardViewModel, useStackedDeck,
} from '@/app/decks/shared'
import {
  InboxCard, InboxCardViewModel, InboxDeckEmpty,
  InboxVerseCardViewModel,
  MemorizingStatus, useInboxDeck, useInboxDeckTutorial,
} from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import { VersePlayer } from '@/app/shared'

const app = inject('app') as Application

const {
  isEmpty, cardsToShow, cardMemorizedToast,
  shiftTopCard, memorizeTopCard, topCard, revert
} = useInboxDeck(app)
const {
  tutorialCardSwiped, addTutorialCards
} = useInboxDeckTutorial()
const {
  updateInactiveCard,
  updateMovingCard,
  updateMovedCard,
  swipeThreshold
} = useStackedDeck()

const showPlayer = computed(() => {
  return topCard.value && topCard.value.type === 'Text' && !!topCard.value.textAudioUri
  // return !!topCard && topCard.type === 'Text' // && topCard.textAudioUri && topCard.type === 'Text'
})

addTutorialCards()




function onCardPlaced(card: VerseCardViewModel) {
  updateInactiveCard(card)
}

function onCardMoving(
  card: InboxCardViewModel,
  deltaPos: Vector3d,
  deltaPosTotal: Vector3d
) {
  updateMovingCard(card, deltaPos)

  if (card instanceof TutorialCardViewModel) { return }
  if (deltaPosTotal.length < swipeThreshold) {
    card.memorizingStatus = MemorizingStatus.Unknown
  } else {
    card.memorizingStatus = deltaPosTotal.isLeftOrRight
      ? MemorizingStatus.StillMemorizing
      : MemorizingStatus.Memorized
  }
}

function onCardMoved(card: InboxCardViewModel, deltaPos: Vector3d) {
  updateMovedCard(card, deltaPos)
  if (deltaPos.length < swipeThreshold) { return }
  setTimeout(() => {
    if (card instanceof TutorialCardViewModel) {
      tutorialCardSwiped(card as TutorialCardViewModel)
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

<style scoped>
.player {
  width: 100%;
  position: absolute;
  bottom: 0px;
  background-color: rgba(var(--ion-color-light-rgb), .75);
  border-top: 1px solid var(--ion-color-light-shade);
  backdrop-filter: blur(5px);
  transition: .2s ease-in-out;
}

.closed {
  bottom: -50px;
  opacity: 0;
}
</style>