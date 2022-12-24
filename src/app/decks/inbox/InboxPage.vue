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
        v-for="card, idx in inbox.cards.value"
        :key="card.id.value"
        :index="idx"
        :card="card"
        :swipe-directions="swipeDirections"
        @swiped="onCardSwiped"
      />

      <!-- Inbox deck is empty -->
      <InboxEmpty
        v-if="inbox.count.value === 0"
        data-testid="inboxEmpty"
      />

      <!-- Toast -->
      <ion-toast
        position="top"
        :message="$t('cards.memorized')"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: () => inbox.revertLastAction() }]"
        :is-open="inbox.isCardMemorizedToastOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="() => inbox.closeCardMemorizedToast()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/vue'
import { computed } from 'vue'
import { inbox } from '@/application'
import { InboxCard, InboxEmpty } from '@/app/decks/inbox'
import { testId } from '@/app/TestId'

const swipeDirections = computed(() => {
  return inbox.cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {
  // const topCard = inbox.cards.value[0]

  setTimeout(() => {
    // if (!first) { return }
    // first.progress = ""
    if (direction == "left" || direction == "right") {
      const first = inbox.cards.value.shift()
      inbox.cards.value.push(first)
    } else if (direction == "top" || direction == "bottom") {
      inbox.openCardMemorizesToast()
      // inbox.cards.value.push(first)
      inbox.cards.value[0].memorized()
    }
  }, 250)
}
</script>
