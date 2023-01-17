<template>
  <ion-page
    :data-testid="testId('inboxPage')"
  >
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
        v-if="userLearningCards.count > 0"
        v-slot="{ card }"
        :cards="cardsToShow"
        @place="cardInteraction.updateCardInactiveState"
        @moving="cardInteraction.updateMovingCardState"
        @moved="(c,v) => cardInteraction.updateMovedCardState(c,v)"
      >
        <InboxCard :card="(card as unknown as InboxCardViewModel)" />
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
import { computed, inject } from 'vue'
import { InboxCard, InboxCardViewModel, InboxDeckEmpty, UserLearningCards } from '@/app/decks/inbox'
import { testId } from '@/app/TestId'
import CardsDeck from '@/app/decks/CardsDeck.vue'
import { DeckCardInteraction } from '@/app/decks/UserMovesCards'
import { CardViewModel } from '@/app/decks/CardViewModel'
import { Vector3d } from '@/app/decks/Vector3d'

const app = inject('app') as Application
const userLearningCards = new UserLearningCards(app)
userLearningCards.open()

const cardsToShow = computed(() => userLearningCards.cards.filter(x => x.index.value < 3))

const cardInteraction = new DeckCardInteraction((card: CardViewModel, vector: Vector3d) => {
  if (vector.direction == "left" || vector.direction == "right") {
    userLearningCards.shiftCard()
  } else if (vector.direction == "top" || vector.direction == "bottom") {
    userLearningCards.cardMemorized()
  }
})

// function idx1(x:any) { return x }
// function idx2(x:any) { return 1 - x}
// const i = ref(idx1)

// function test() {
//   i.value = i.value == idx1 ? idx2 : idx1
// }

// const swipeDirections = computed(() => {
//   return userLearningCards.count > 1
//     ? ['top', 'bottom', 'left', 'right']
//     : ['top', 'bottom']
// })

// function onCardSwiped(direction: string) {
//   setTimeout(() => {
//     if (direction == "left" || direction == "right") {
//       userLearningCards.shiftCard()
//     } else if (direction == "top" || direction == "bottom") {
//       userLearningCards.cardMemorized()
//     }
//   }, 250)
// }

async function onRevert() {
  await userLearningCards.revert()
}

// function initialState(cardState: CardViewModel) {
//   cardState.position.x = 0 // = new Vector3d(0, cardState.index*5, -(cardState.index * 80))
//   cardState.position.y =  cardState.index.value * 30
//   cardState.position.z = -(cardState.index.value * 80)
//   cardState.angle.x = 0
//   cardState.angle.y = 0
//   cardState.angle.z = 0
// }
// function onMoving(cardState: CardViewModel, deltaPos: Vector3d) {
//   cardState.position.x += deltaPos.x
//   cardState.position.y += deltaPos.y
//   cardState.angle.z = 15 * (cardState.position.x / 300)
//   if (cardState.angle.z >  15)  { cardState.angle.z = 15 }
//   if (cardState.angle.z < -15)  { cardState.angle.z = -15 }
// }

// function onMoved(cardState: CardViewModel, vector: Vector3d) {
//   if (vector.length < 30) { return }
//   cardState.position.x *= 5
//   cardState.position.y *= 5
//   setTimeout(() => {
//     if (vector.direction == "left" || vector.direction == "right") {
//       userLearningCards.shiftCard()
//     } else if (vector.direction == "top" || vector.direction == "bottom") {
//       userLearningCards.cardMemorized()
//     }
//   }, 250)
// }

</script>
