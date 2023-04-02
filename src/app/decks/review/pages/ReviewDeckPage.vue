<template>
  <ion-page>
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
        :interval="swipePopup.interval"
      />

      <StackedFlipCardsDeck
        v-show="!isEmpty"
        ref="deck"
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
        :class="{ 'closed': !showGradeButtons }"
        class="buttons"
      >
        <GradeCardButtons
          :intervals="gradeButtonIntervals"
          @graded="onGradeButtonClicked"
        />
      </div>

      <ReviewDeckEmpty
        v-show="isEmpty"
        data-testid="reviewEmpty"
      />
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import { ReviewCard, ReviewCardReviewed, ReviewGrade, Scheduler, UpdateVerseStatus, Verse, VerseId } from '@akdasa-studios/shlokas-core'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { computed, reactive, ref, watch } from 'vue'
import { useArrayFind } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { StackedFlipCardsDeck , useIndexedList, useLibraryCache } from '@/app/decks/shared'
import { ReviewFlipCard, ReviewDeckEmpty, ReviewCardSwipeOverlay, GradeCardButtons } from '@/app/decks/review'
import { useSettingsStore } from '@/app/settings'
import { TutorialSteps, useTutorialStore } from '@/app/tutorial'
import { useApplication } from '@/app/shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApplication()
const libraryCache = useLibraryCache(application.instance())
const indexedList = useIndexedList()
const settings = useSettingsStore()
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

type SwipeActions = 'forgot' | 'hard' | 'good' | 'easy' | 'none'

interface SwipePopup {
  show: boolean,
  status: SwipeActions,
  interval: number
}


const deck = ref()
const cardsToShow = ref<CardState[]>([])
const swipePopup = reactive<SwipePopup>({ show: false, status: 'none', interval: 0 })
const isEmpty = computed(() => cardsToShow.value.length === 0)
const topCard = useArrayFind(cardsToShow, x => x.index === 0)
const showGradeButtons = computed(() => topCard.value?.flipped && settings.appearanceSettings.gradeButtons)
const { currentStep } = storeToRefs(tutorial)

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
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */


watch(currentStep, async (value: number) => {
  if (value === TutorialSteps.ReviewDeckQuestionAndAnswer || value === TutorialSteps.ReviewDeckGradeAllCards) {
    await onOpened()
  }
})
watch([application.now, application.currentContextName], onOpened)

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onOpened)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  const app = application.instance()
  reviewCards = await app.reviewDeck.dueToCards(app.timeMachine.now)
  await libraryCache.load(reviewCards.map(x => x.verseId))

  const result = []
  for (const [index, card] of reviewCards.entries()) {
    result.push({
      id: card.id.value, index, flipped: false, verseId: card.verseId
    })
  }
  cardsToShow.value = result
}

function onCardFlipped(data: any) {
  const state = getCardState(data.id)
  state.flipped = !state.flipped
  tutorial.completeStep(TutorialSteps.ReviewDeckQuestionAndAnswer)
}

function onCardSwipeMoving(id: string, { distance, direction }: { distance: number, direction: string }) {
  swipePopup.show = true
  const grade = getGrade(direction, distance)
  if (grade !== undefined) {
    swipePopup.status = (distance > 40
      ? ReviewGrade[grade].toString().toLowerCase()
      : 'none') as SwipeActions

    swipePopup.interval = new Scheduler().getNewInterval(
      getReviewCard(id).interval,
      getReviewCard(id).ease / 100, grade
    )
  } else {
    swipePopup.status = 'none'
  }
}

function onCardSwipeCancelled() {
  swipePopup.show = false
  swipePopup.status = 'none'
}

async function onCardSwipeFinished(id: string, { direction, distance }: { distance: number, direction: string }) {
  if (!topCard.value?.id) { return }
  const grade = getGrade(direction, distance)
  if (grade !== undefined) { await gradeCard(getReviewCard(topCard.value.id), grade) }
}

async function onGradeButtonClicked(grade: ReviewGrade) {
  if (!topCard.value?.id) { return }
  deck.value.swipeTopCard()
  setTimeout(async () => {
    await gradeCard(getReviewCard(topCard.value.id), grade)
  }, 250)
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function gradeCard(reviewCard: ReviewCard, grade: ReviewGrade) {
  const app = application.instance()
  await app.execute(new ReviewCardReviewed(reviewCard, grade))
  const isCardDueToday = reviewCard.dueTo.getTime() <= app.timeMachine.today.getTime()

  if (isCardDueToday) {
    indexedList.shiftItem(cardsToShow)
  } else {
    await app.execute(new UpdateVerseStatus(reviewCard.verseId))
    indexedList.removeItem(cardsToShow)
  }
  setTimeout(() => swipePopup.status = 'none', 250)
  swipePopup.show = false

  tutorial.completeStep(TutorialSteps.ReviewDeckGradeCard)
  if (cardsToShow.value.length === 0) {
    tutorial.completeStep(TutorialSteps.ReviewDeckGradeAllCards)
  }

}

function canBeSwiped(_: string, { direction, distance }: { direction: string, distance: number }) {
  const isLastCard = cardsToShow.value.length === 1
  const isForgottenCard = getGrade(direction, distance) === ReviewGrade.Forgot
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

function getGrade(direction: string, distance: number): ReviewGrade | undefined {
  if (['left', 'right'].includes(direction)) { return ReviewGrade.Forgot }
  if (['up', 'buttom'].includes(direction)) {
    if (distance > 120) { return ReviewGrade.Easy }
    if (distance > 80) { return ReviewGrade.Good }
    if (distance > 40) { return ReviewGrade.Hard }
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Tutorial                                  */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(() => completeTutorialStep(TutorialSteps.InboxDeckEnd))

function completeTutorialStep(step: TutorialSteps) {
  tutorial.completeStep(step)
}
</script>


<style scoped>
.buttons {
  width: 100%;
  position: absolute;
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