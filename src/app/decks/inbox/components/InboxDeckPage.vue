<template>
  <ion-page
    :data-testid="testId('inboxPage')"
  >
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title @click="test">
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
        v-if="userLearningCards.count > 0"
        v-slot="card"
        :cards="userLearningCards.cards"
        :show-cards="3"
      >
        <InboxCard
          :key="card.card.id"
          :index="card.card.index.value"
          :card="(card.card as unknown as InboxCardViewModel)"
          :swipe-directions="swipeDirections"
          @swiped="onCardSwiped"
        />
      </CardsDeck>

      <InboxDeckEmpty
        v-else
        data-testid="inboxEmpty"
      />

      <ion-toast
        position="top"
        :message="$t('cards.memorized')"
        :buttons="[{ text: 'Revert', role: 'cancel', handler: onRevert }]"
        :is-open="userLearningCards.cardMemorizedToast.isOpen.value"
        :duration="2000"
        color="dark"
        @did-dismiss="userLearningCards.cardMemorizedToast.close()"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/vue'
import { computed, inject, ref } from 'vue'
import { InboxCard, InboxCardViewModel, InboxDeckEmpty, UserLearningCards } from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import CardsDeck from '@/app/decks/CardsDeck.vue'

const app = inject('app') as Application
const userLearningCards = new UserLearningCards(app)
userLearningCards.open()

function idx1(x:any) { return x }
function idx2(x:any) { return 1 - x}
const i = ref(idx1)

function test() {
  i.value = i.value == idx1 ? idx2 : idx1
}

const swipeDirections = computed(() => {
  return userLearningCards.count > 1
    ? ['top', 'bottom', 'left', 'right']
    : ['top', 'bottom']
})

function onCardSwiped(direction: string) {
  setTimeout(() => {
    if (direction == "left" || direction == "right") {
      userLearningCards.shiftCard()
    } else if (direction == "top" || direction == "bottom") {
      userLearningCards.cardMemorized()
    }
  }, 250)
}

async function onRevert() {
  await userLearningCards.revert()
}
</script>
