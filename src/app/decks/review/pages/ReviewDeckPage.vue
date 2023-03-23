<template>
  <ion-page :data-testid="testId('inboxPage')">
    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ $t('decks.review.title') }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content
      :scroll-y="false"
      :scroll-x="false"
    >
      <ReviewCardSwipeOverlay
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
        <ReviewFlipCard
          :card="getReviewCard(data.id)"
          :verse="getVerse(data.id)"
          :flipped="getCardState(data.id).flipped"
          :show-overlay="false"
          :index="getCardState(data.id).index"
          class="color"
          @click="onCardFlipped(data)"
        />
      </StackedFlipCardsDeck>

      <div
        :class="{ 'closed' : !showGradeButtons }"
        class="buttons"
      >
        <GradeCardButtons
          :intervals="gradeButtonIntervals"
          @graded="onGradeButtonClicked"
        />
      </div>

      <ReviewDeckEmpty
        v-show="isEmpty"
        data-testid="inboxEmpty"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { Application, ReviewCard, ReviewCardReviewed, ReviewGrade, Scheduler, UpdateVerseStatus, Verse, VerseId } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { computed, inject, reactive, ref } from 'vue'
import { useArrayFind } from '@vueuse/core'
import { StackedFlipCardsDeck } from '@/app/decks/inbox'
import { ReviewFlipCard, ReviewDeckEmpty, ReviewCardSwipeOverlay, GradeCardButtons } from '@/app/decks/review'
import { useIndexedList, useLibraryCache } from '@/app/decks/shared'
import { testId } from '@/app/TestId'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
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

type SwipeActions = 'forgot' | 'hard' | 'good' | 'easy' | 'none'

interface SwipePopup {
  show: boolean,
  status: SwipeActions
}


const cardsToShow = ref<CardState[]>([])
const swipePopup = reactive<SwipePopup>({ show: false, status: 'none'})
const isEmpty = computed(() => cardsToShow.value.length === 0)
const topCard = useArrayFind(cardsToShow, x => x.index === 0)
const showGradeButtons = computed(() => topCard.value?.flipped)

let reviewCards: readonly ReviewCard[] = []
const gradeButtonIntervals = computed(() => {
  const sc = new Scheduler()
  if (topCard.value === undefined) return [0, 0, 0, 0]
  return [
    ReviewGrade.Forgot, ReviewGrade.Hard,
    ReviewGrade.Good, ReviewGrade.Easy
  ].map(x =>
    sc.getNewInterval(
      getReviewCard(topCard.value.id).interval,
      getReviewCard(topCard.value.id).ease / 100, x
    )
  )
})


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onOpened)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  reviewCards = await app.reviewDeck.dueToCards(app.timeMachine.now)
  console.log(reviewCards)
  await libraryCache.load([])

  for (const [index, card] of reviewCards.entries()) {
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
  const grade = ReviewGrade[getGrade(direction)]
  if (grade) {
    swipePopup.status = (distance > 40
      ? grade.toString().toLowerCase()
      : 'none') as SwipeActions
  }
}

function onCardSwipeCancelled() {
  swipePopup.show = false
  swipePopup.status = 'none'
}

async function onCardSwipeFinished(id: string, { direction }: { direction: string }) {
  if (!topCard.value?.id) { return }
  await gradeCard(getReviewCard(topCard.value.id), getGrade(direction))
}

async function onGradeButtonClicked(grade: ReviewGrade) {
  if (!topCard.value?.id) { return }
  await gradeCard(getReviewCard(topCard.value.id), grade)
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function gradeCard(reviewCard: ReviewCard, grade: ReviewGrade) {
  if (grade === ReviewGrade.Forgot) {
    indexedList.shiftItem(cardsToShow)
  } else {
    indexedList.removeItem(cardsToShow)
    await app.processor.execute(new ReviewCardReviewed(reviewCard, grade))
    await app.processor.execute(new UpdateVerseStatus(reviewCard.verseId))
  }
  setTimeout(() => swipePopup.status = 'none', 250)
  swipePopup.show = false
}

function canBeSwiped(_: string, { direction, distance }: { direction: string, distance: number }) {
  const isLastCard = cardsToShow.value.length === 1
  const isForgottenCard = getGrade(direction) === ReviewGrade.Forgot
  if (isLastCard && isForgottenCard) { return false }
  return distance > 40
}

function getCardState(id: string): CardState {
  return cardsToShow.value.find(x => x.id === id) as CardState
}

function getReviewCard(id: string): ReviewCard {
  return reviewCards.find(x => x.id.value === id) as ReviewCard
}

function getVerse(reviewCardId: string): Verse {
  const verseId = getReviewCard(reviewCardId).verseId
  return libraryCache.getVerse(verseId)
}

function getGrade(direction: string) : ReviewGrade {
  return {
    'up': ReviewGrade.Forgot,
    'down': ReviewGrade.Hard,
    'left': ReviewGrade.Good,
    'right': ReviewGrade.Easy
  }[direction] as ReviewGrade
}
</script>


<style scoped>
.buttons {
  width: 100%;
  position:absolute;
  bottom: 0px;
  background-color: rgba(var(--ion-color-light-rgb), .75);
  border-top: 1px solid var(--ion-color-light-shade);
  backdrop-filter: blur(5px);
  transition: .2s ease-in-out;
}
.closed {
  bottom: -50px;
  opacity: 0;
}
</style>