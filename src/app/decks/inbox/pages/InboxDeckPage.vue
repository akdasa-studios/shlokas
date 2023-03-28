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
        :cards="cards"
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
          :index="getCardState(data.id).index"
          :image="getDefaultImage(data.id)"
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
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter, onIonViewDidLeave } from '@ionic/vue'
import { computed, inject, ref, reactive } from 'vue'
import { testId } from '@/app/TestId'
import { InboxFlipCard, InboxCardSwipeOverlay, InboxDeckEmpty } from '@/app/decks/inbox'
import { useLibraryCache, useIndexedList, StackedFlipCardsDeck } from '@/app/decks/shared'
import { useTutorialStore, TutorialSteps } from '@/app/tutorial'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const libraryCache = useLibraryCache(app)
const indexedList = useIndexedList()
const tutorial = useTutorialStore()


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


const cards = ref<CardState[]>([])
const swipePopup = reactive<SwipePopup>({ show: false, status: 'none'})
const isEmpty = computed(() => cards.value.length === 0)

let inboxCards: readonly InboxCard[] = []

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(async () => await onOpened())
onIonViewDidLeave(() => cards.value = [])
setTimeout(() => tutorial.completeStep(TutorialSteps.OpenInboxDeck), 5000)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  inboxCards = await app.inboxDeck.cards()
  await libraryCache.load(inboxCards.map(x => x.verseId))

  const result = []
  for (const [index, card] of inboxCards.entries()) {
    result.push({
      id: card.id.value, index, flipped: false, verseId: card.verseId
    })
  }
  cards.value = result
}

function onCardFlipped(data: any) {
  const state = getCardState(data.id)
  if (state.index !== 0) return
  state.flipped = !state.flipped
  tutorial.completeStep(TutorialSteps.FlipInboxCard)
  tutorial.completeStep(TutorialSteps.FlipInboxCardAgain)
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
    indexedList.shiftItem(cards)
    tutorial.completeStep(TutorialSteps.SwipeInboxCardLeft)
  } else {
    const card = getInboxCard(id)
    indexedList.removeItem(cards)
    await app.processor.execute(new InboxCardMemorized(card))
    await app.processor.execute(new UpdateVerseStatus(card.verseId))
    tutorial.completeStep(TutorialSteps.SwipeInboxCardUp)
  }
  setTimeout(() => swipePopup.status = 'none', 250)
  swipePopup.show = false
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function canBeSwiped(_: string, { direction, distance }: { direction: string, distance: number }) {
  if (['left', 'right'].includes(direction)) {
    return cards.value.length > 1 && distance > 40
  }
  return distance > 120
}

function getCardState(id: string): CardState {
  const res = cards.value.find(x => x.id === id)
  return res as CardState
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

function getDefaultImage(inboxCardId: string) {
  const verseId = getInboxCard(inboxCardId).verseId
  return libraryCache.getVerseImage(verseId)
}
</script>
