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
        :visible="showOverlay.show"
        :status="showOverlay.status"
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
import { Application, Declamation, InboxCard, InboxCardMemorized, Language, UpdateVerseStatus, Verse } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { computed, inject, ref, shallowRef } from 'vue'
import { testId } from '@/app/TestId'
import { InboxFlipCard, StackedFlipCardsDeck, InboxCardSwipeOverlay, InboxDeckEmpty } from '@/app/decks/inbox'
import { useAudioPlayerStore } from '@/app/shared'
import { removeItem, shiftItem } from '../../shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const audioPlayerStore = useAudioPlayerStore()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

interface CardState {
  id: string,
  index: number,
  flipped: boolean
}

const cards = shallowRef<readonly InboxCard[]>([])
const verses = shallowRef<readonly Verse[]>([])
const declamations = shallowRef<{[ id: string ]: Declamation[]}>({})

const cardsToShow = ref<CardState[]>([])
const showOverlay = ref({ show: false, status: 'none'})
const isEmpty = computed(() => cardsToShow.value.length === 0)

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onOpened)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  verses.value = await app.library.all(new Language('en', 'en')) // TODO: Load only needed verses
  cards.value = await app.inboxDeck.cards()

  for (const [index, card] of cards.value.entries()) {
    const verse = getVerse(card.id.value)
    declamations.value[card.id.value] = []
    declamations.value[card.id.value].push(
      ...await app.library.getDeclamations(verse.id)
    )
    declamations.value[card.id.value].push(
      ...await app.library.getDeclamations(verse.reference)
    )

    cardsToShow.value.push({
      id: card.id.value, index, flipped: false
    })
  }
}

function onCardFlipped(data: any) {
  const state = getCardState(data.id)
  state.flipped = !state.flipped
}

function onCardSwipeMoving(id: string, { distance, direction }: { distance: number, direction: string }) {
  showOverlay.value.show = true

  if (['left', 'right'].includes(direction) && distance > 40) {
    showOverlay.value.status = 'memorizing'
  } else if (distance > 120) {
    showOverlay.value.status = 'memorized'
  } else {
    showOverlay.value.status = 'none'
  }
}

function onCardSwipeCancelled() {
  showOverlay.value.show = false
  showOverlay.value.status = 'none'
}

async function onCardSwipeFinished(id: string, { direction }: { direction: string }) {
  if (['left', 'right'].includes(direction)) {
    shiftItem(cardsToShow)
  } else {
    const card = getInboxCard(id)
    removeItem(cardsToShow)
    await app.processor.execute(new InboxCardMemorized(card))
    await app.processor.execute(new UpdateVerseStatus(card.verseId))
  }
  setTimeout(() => showOverlay.value.status = 'none', 250)
  showOverlay.value.show = false
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

function getInboxCard(id: string): InboxCard {
  return cards.value.find(x => x.id.value === id) as InboxCard
}

function getVerse(id: string): Verse {
  const verseId = getInboxCard(id).verseId.value
  return verses.value.find(x => x.id.value === verseId) as Verse
}

function getCardState(id: string): CardState {
  return cardsToShow.value.find(x => x.id === id) as CardState
}

function getDeclamations(id: string) {
  return declamations.value[id]
}
</script>
