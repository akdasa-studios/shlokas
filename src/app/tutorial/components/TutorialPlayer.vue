<template>
  <div>
    <ConfettiExplosion
      v-if="showConfetti"
      class="confetti"
      :force=".3"
      :duration="5000"
    />
    <TutorialCards
      ref="tutorial"
      :cards="steps"
      :step="currentStep"
      @card-clicked="onCardClicked"
    />
  </div>
</template>


<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { inject, ref } from 'vue'
import { Application } from '@akdasa-studios/shlokas-core'
import ConfettiExplosion from 'vue-confetti-explosion'
import { TutorialCards, TutorialSteps, useTutorialStore } from '@/app/tutorial'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const app = inject('app') as Application
const tutorialStore = useTutorialStore()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { currentStep, steps } = storeToRefs(tutorialStore)
const showConfetti = ref(false)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardClicked() {
  // tutorialStore.completeStep()
}

function goToTheNextStep() {
  tutorialStore.completeStep(tutorialStore.currentStep)
}

tutorialStore.registerSteps([
  {
    id: TutorialSteps.OverallIntroduction,
    text: 'tutorial.introduction',
    buttons: [
      { id: 'yes', text: 'common.yes', color: 'success' },
      { id: 'no', text: 'common.no', color: 'danger' }
    ],
    onButtonClicked: (buttonId: string) => {
      if (buttonId === 'no') {
        tutorialStore.currentStep = 9999
        console.log('NO',  tutorialStore.currentStep)
      }
      if (buttonId === 'yes') { goToTheNextStep() }
    }
  },

  /* -------------------------------------------------------------------------- */
  /*                                   Library                                  */
  /* -------------------------------------------------------------------------- */

  {
    id: TutorialSteps.LibraryIntroduction,
    text: 'tutorial.library.introduction',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.LibrarySearch,
    text: 'tutorial.library.search'
  },


  {
    id: TutorialSteps.LibraryOpenVerse,
    text: 'tutorial.library.openVerse'
  },

  {
    id: TutorialSteps.LibraryAddVerse,
    text:'tutorial.library.addVerse'
  },

  {
    id: TutorialSteps.LibraryEnd,
    text: 'tutorial.library.end'
  },


  /* -------------------------------------------------------------------------- */
  /*                                    Inbox                                   */
  /* -------------------------------------------------------------------------- */

  {
    id: TutorialSteps.InboxDeckIntroduction,
    text: 'tutorial.inboxDeck.introduction',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.InboxDeckSwipeCardLeft,
    text: 'tutorial.inboxDeck.swipeCardLeft',
  },

  {
    id: TutorialSteps.InboxDeckFlipCard,
    text: 'tutorial.inboxDeck.flipCard',
  },

  {
    id: TutorialSteps.InboxDeckPlayDeclamation,
    text: 'tutorial.inboxDeck.playDeclamation'
  },

  {
    id: TutorialSteps.InboxDeckFlipCardAgain,
    text: 'tutorial.inboxDeck.flipCardAgain'
  },

  {
    id: TutorialSteps.InboxDeckSwipeCardUp,
    text: 'tutorial.inboxDeck.swipeCardUp'
  },

  {
    id: TutorialSteps.InboxDeckEnd,
    text: 'tutorial.inboxDeck.end'
  },


  /* -------------------------------------------------------------------------- */
  /*                                   Review                                   */
  /* -------------------------------------------------------------------------- */

  {
    id: TutorialSteps.ReviewDeckIntroduction,
    text: 'tutorial.reviewDeck.introduction',
    buttons: [
      { id: 'go', text: 'common.forward', color: 'success' },
    ],
    onButtonClicked: () => {
      nextDay()
      goToTheNextStep()
    }
  },

  {
    id: TutorialSteps.ReviewDeckQuestionAndAnswer,
    text: 'tutorial.reviewDeck.questionAndAnswer'
  },

  {
    id: TutorialSteps.ReviewDeckGradeCard,
    text: 'tutorial.reviewDeck.gradeCard',
    position: 'aboveGradeButtons'
  },

  {
    id: TutorialSteps.ReviewDeckGoToFuture,
    text: 'tutorial.reviewDeck.goToFuture',
    buttons: [
      { id: 'go', text: 'common.forward', color: 'success' },
    ],
    onButtonClicked: goToTheNextStep
  },

  {
    id: TutorialSteps.ReviewDeckGradeAllCards,
    text: 'tutorial.reviewDeck.gradeAllCards',
    duration: 5000,
    onEnter: () => nextDay(7)
  },

  {
    id: TutorialSteps.ReviewDeckEnd,
    text: 'tutorial.reviewDeck.end',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.TutorialCongratulations,
    text: 'tutorial.congratulations',
    duration: 5000,
    onEnter: () => {
      showConfetti.value = true
    },
    onTimeout() {
      currentStep.value = TutorialSteps.TutorialEnd
    }
  },

])

function nextDay(days=1) {
  app.timeMachine.set(
    app.timeMachine.add(app.timeMachine.now, 24*days, 'h')
  )
}

const tutorial = ref()
</script>

<style scoped>
.confetti {
  position: absolute;
  top: 5%;
  left: 50%;
}
</style>