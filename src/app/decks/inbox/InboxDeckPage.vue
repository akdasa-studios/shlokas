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
        v-for="card, idx in shlokas.inboxDeck.cards.value"
        :key="card.id.value"
        :index="idx"
        :card="card"
        :swipe-directions="swipeDirections"
        @swiped="onCardSwiped"
      />

      <!-- Inbox deck is empty -->
      <InboxDeckEmpty
        v-if="shlokas.inboxDeck.count.value === 0"
        data-testid="inboxEmpty"
      />

      <!-- Toast -->
      <ion-toast
        position="top"
        :message="$t('cards.memorized')"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: () => shlokas.inboxDeck.revertLastAction() }]"
        :is-open="shlokas.inboxDeck.isCardMemorizedToastOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="() => shlokas.inboxDeck.closeCardMemorizedToast()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/vue'
import { computed } from 'vue'
import { shlokas } from '@/application'
import { InboxCard, InboxDeckEmpty } from '@/app/decks/inbox'
import { testId } from '@/app/TestId'

const swipeDirections = computed(() => {
  return shlokas.inboxDeck.cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {
  // const topCard = inbox.cards.value[0]

  setTimeout(() => {
    // if (!first) { return }
    // first.progress = ""
    if (direction == "left" || direction == "right") {
      const first = shlokas.inboxDeck.cards.value.shift()
      shlokas.inboxDeck.cards.value.push(first)
    } else if (direction == "top" || direction == "bottom") {
      shlokas.inboxDeck.openCardMemorizesToast()
      // inbox.cards.value.push(first)
      shlokas.inboxDeck.cards.value[0].memorized()
    }
  }, 250)
}
</script>
