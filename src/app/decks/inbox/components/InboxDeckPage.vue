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
        :compute-style="calculateStyle"
        class="deck"
        card-class="card1"
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
        v-show="isEmpty"
        data-testid="inboxEmpty"
      />

      <div
        :class="{ 'closed': !showPlayer }"
        class="player"
      >
        <VerseAudioPlayer
          :url="(topCard as InboxVerseCardViewModel)?.textAudioUri"
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
import { CardsDeck } from '@akdasa-studios/shlokas-uikit'
import {
  Vector3d, VerseCardViewModel,
  TutorialCard, TutorialCardViewModel, useStackedDeck,
} from '@/app/decks/shared'
import {
  InboxCard, InboxCardViewModel, InboxDeckEmpty,
  InboxVerseCardViewModel,
  MemorizingStatus, useInboxDeck, useInboxDeckTutorial,
} from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import { VerseAudioPlayer } from '@/app/shared'

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
})

addTutorialCards()




function onCardPlaced(card: VerseCardViewModel) {
  updateInactiveCard(card)
}

// function getDifference(a: Coordinates, b: Coordinates): Coordinates {
//   return [a[0] - b[0], a[1] - b[1]]
// }

function onCardMoving(
  card: InboxCardViewModel,
  start: [number, number],
  current: [number, number]
) {
  const dp = new Vector3d(current[0] - start[0], current[1] - start[1], 0)
  updateMovingCard(card, dp)

  if (card instanceof TutorialCardViewModel) { return }
  if (dp.length < swipeThreshold) {
    card.memorizingStatus = MemorizingStatus.Unknown
  } else {
    card.memorizingStatus = dp.isLeftOrRight
      ? MemorizingStatus.StillMemorizing
      : MemorizingStatus.Memorized
  }
}


function onCardMoved(
  card: InboxCardViewModel,
  start: [number, number],
  current: [number, number]
) {
  const dp = new Vector3d(current[0] - start[0], current[1] - start[1], 0)
  updateMovedCard(card, dp)

  if (dp.length < swipeThreshold) { return }
  setTimeout(() => {
    if (card instanceof TutorialCardViewModel) {
      tutorialCardSwiped(card as TutorialCardViewModel)
      return
    }

    if (dp.isLeftOrRight) {
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

function calculateStyle(card: any) {
  return card.style
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

/deep/ .card1 {
  position: absolute;
  width: 100%;
  height: calc(100% - 10px);
}

.deck {
  width: 100%;
  height: 100%;
  perspective: 1300px;
}
</style>