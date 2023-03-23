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
      <InboxCardSwipeOverlay
        :visible="swipePopup.show"
        :status="swipePopup.status"
      />

      <StackedFlipCardsDeck
        v-if="!isEmpty"
        v-slot="data"
        :cards="cardsToShow"
        :can-swipe="canBeSwiped"
        @swipe:moving="onCardSwipeMoving"
        @swipe:cancel="onCardSwipeCancelled"
        @swipe:finish="onCardSwipeFinished"
      >
        <InboxFlipCard
          :card="getInboxCard(data.id)"
          :verse="getVerse(data.id)"
          :flipped="getCardState(data.id).flipped"
          :declamations="getDeclamations(data.id)"
          :show-overlay="false"
          :index="getCardState(data.id).index"
          class="color"
          @click="onCardFlipped(data)"
        />
      </StackedFlipCardsDeck>

      <InboxDeckEmpty
        v-show="isEmpty"
        data-testid="inboxEmpty"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, InboxCard, InboxCardMemorized, UpdateVerseStatus, Verse, VerseId } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { computed, inject, ref, reactive } from 'vue'
import { testId } from '@/app/TestId'
import { InboxFlipCard, StackedFlipCardsDeck, InboxCardSwipeOverlay, InboxDeckEmpty } from '@/app/decks/inbox'
import { useAudioPlayerStore } from '@/app/shared'
import { useLibraryCache, useIndexedList } from '@/app/decks/shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const audioPlayerStore = useAudioPlayerStore()
const libraryCache = useLibraryCache(app)
const indexedList = useIndexedList()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

interface CardState {
  id: string,
  index: number,
  flipped: boolean,
  verseId: VerseId
}

type SwipeActions = 'none' | 'memorizing' | 'memorized'

interface SwipePopup {
  show: boolean,
  status: SwipeActions
}


const cardsToShow = ref<CardState[]>([])
const swipePopup = reactive<SwipePopup>({ show: false, status: 'none'})
const isEmpty = computed(() => cardsToShow.value.length === 0)

let inboxCards: readonly InboxCard[] = []

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onOpened)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  inboxCards = await app.inboxDeck.cards()
  await libraryCache.load([])

  for (const [index, card] of inboxCards.entries()) {
    cardsToShow.value.push({
      id: card.id.value, index, flipped: false, verseId: card.verseId
    })
  }
}

function onCardFlipped(data: any) {
  const state = getCardState(data.id)
  state.flipped = !state.flipped
}

function onCardSwipeMoving(id: string, { distance, direction }: { distance: number, direction: string }) {
  swipePopup.show = true

  if (['left', 'right'].includes(direction) && distance > 40) {
    swipePopup.status = 'memorizing'
  } else if (distance > 120) {
    swipePopup.status = 'memorized'
  } else {
    swipePopup.status = 'none'
  }
}

function onCardSwipeCancelled() {
  swipePopup.show = false
  swipePopup.status = 'none'
}

async function onCardSwipeFinished(id: string, { direction }: { direction: string }) {
  if (['left', 'right'].includes(direction)) {
    indexedList.shiftItem(cardsToShow)
  } else {
    const card = getInboxCard(id)
    indexedList.removeItem(cardsToShow)
    await app.processor.execute(new InboxCardMemorized(card))
    await app.processor.execute(new UpdateVerseStatus(card.verseId))
  }
  setTimeout(() => swipePopup.status = 'none', 250)
  swipePopup.show = false
  audioPlayerStore.close()
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function canBeSwiped(_: string, { direction, distance }: { direction: string, distance: number }) {
  if (['left', 'right'].includes(direction)) {
    return cardsToShow.value.length > 1 && distance > 40
  }
  return distance > 120
}


function getCardState(id: string): CardState {
  return cardsToShow.value.find(x => x.id === id) as CardState
}

function getInboxCard(id: string): InboxCard {
  return inboxCards.find(x => x.id.value === id) as InboxCard
}

function getVerse(inboxCardId: string): Verse {
  const verseId = getInboxCard(inboxCardId).verseId
  return libraryCache.getVerse(verseId)
}
function getDeclamations(inboxCardId: string) {
  const verseId = getInboxCard(inboxCardId).verseId
  return libraryCache.getDeclamations(verseId)
}
</script>
