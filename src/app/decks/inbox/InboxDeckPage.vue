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
        v-for="card, idx in vm.cards.value"
        :key="card.id.value"
        :index="idx"
        :card="card"
        :swipe-directions="swipeDirections"
        @swiped="onCardSwiped"
      />

      <!-- Inbox deck is empty -->
      <InboxDeckEmpty
        v-if="vm.count.value === 0"
        data-testid="inboxEmpty"
      />

      <!-- Toast -->
      <ion-toast
        position="top"
        :message="$t('cards.memorized')"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: () => vm.cardMemorizedToast.revert() }]"
        :is-open="vm.cardMemorizedToast.isOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="() => vm.cardMemorizedToast.close()"
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

const vm = shlokas.inboxDeck

const swipeDirections = computed(() => {
  return shlokas.inboxDeck.cards.value.length > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {
  setTimeout(() => {
    if (direction == "left" || direction == "right") {
      const first = shlokas.inboxDeck.cards.value.shift()
      vm.cards.value.push(first)
    } else if (direction == "top" || direction == "bottom") {
      vm.cardMemorizedToast.open()
      vm.cards.value[0].memorized()
    }
  }, 250)
}
</script>
