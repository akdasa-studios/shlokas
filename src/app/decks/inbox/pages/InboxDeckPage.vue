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
import { Application, Declamation, InboxCard, InboxCardMemorized, Language, Verse } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { computed, inject, ref, shallowRef } from 'vue'
import { testId } from '@/app/TestId'
import { InboxFlipCard, StackedFlipCardsDeck, InboxCardSwipeOverlay, InboxDeckEmpty } from '@/app/decks/inbox'
import { removeItem, shiftItem } from '../../shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application

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
  verses.value = await app.library.all(new Language('en', 'en'))
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
  const idx = cardsToShow.value.findIndex(x=> x.id=data.id)
  cardsToShow.value[idx].flipped = !cardsToShow.value[idx].flipped
}

function onCardSwipeMoving(id: string, { distance, direction }: { distance: number, direction: string }) {
  showOverlay.value.show = true
  showOverlay.value.status = distance > 40
    ? (['left', 'right'].includes(direction)
       ? 'memorizing'
       : 'memorized')
    : 'none'
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
  }
  setTimeout(() => showOverlay.value.status = 'none', 250)
  showOverlay.value.show = false
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function canBeSwiped(_: string, { direction }: { direction: string }) {
  if (['left', 'right'].includes(direction)) {
    return cardsToShow.value.length > 1
  }
  return true
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

<style scoped>
.color {
  filter: hue-rotate(15deg);
}
</style>