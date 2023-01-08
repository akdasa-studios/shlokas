<template>
  <ion-page
    :data-testid="testId('inboxPage')"
  >
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('decks.inbox.title') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
    >
      <InboxCard
        v-for="card, idx in cards"
        :key="card.id.value"
        :index="idx"
        :card="(card as unknown as InboxCardViewModel)"
        :swipe-directions="swipeDirections"
        @swiped="onCardSwiped"
      />

      <InboxDeckEmpty
        v-if="store.count === 0"
        data-testid="inboxEmpty"
      />

      <ion-toast
        position="top"
        :message="$t('cards.memorized')"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: onRevert }]"
        :is-open="cardMemorizedToast.isOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="cardMemorizedToast.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, InboxCardMemorized } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { computed, inject } from 'vue'
import { testId } from '@/app/TestId'
import { InboxCard, InboxCardViewModel, InboxDeckEmpty } from '@/app/decks/inbox'
import { useToast } from '@/app/composables'
import { useReviewDeckStore } from '../review'
import { useInboxDeckStore } from './useInboxStore'

const app = inject('app') as Application
const store = useInboxDeckStore(app)
const reviewDeck = useReviewDeckStore(app)
const cardMemorizedToast = useToast()
const { cards, count } = storeToRefs(store)
const { shiftCard, memorizeCard } = store
const { refresh: refreshReviewDeck } = reviewDeck

store.refresh()

const swipeDirections = computed(() => {
  return count.value > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {
  setTimeout(async () => {
    if (direction == "left" || direction == "right") {
      shiftCard()
    } else if (direction == "top" || direction == "bottom") {
      const m = memorizeCard()
      if (m) {
        const inboxCard = m._card.object
        await app.processor.execute(new InboxCardMemorized(inboxCard))
        await refreshReviewDeck()
        cardMemorizedToast.open()
      }
    }
  }, 250)
}

function onRevert() {
  app.processor.revert()
}
</script>
