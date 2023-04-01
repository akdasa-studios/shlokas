<template>
  <div>
    <ConfettiExplosion
      v-if="showConfetti"
      class="confetti"
      :force=".3"
      :duration="5000"
    />
    <TutorialCards
      :cards="steps"
      :step="currentStep"
      @card-clicked="onCardClicked"
    />
  </div>
</template>


<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'
import { TutorialCards, TutorialSteps, useTutorialStore } from '@/app/tutorial'
import { useApp } from '@/app/shared'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApp()
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
      }
      if (buttonId === 'yes') {
        application.switchContextTo('tutorial')
        goToTheNextStep()
      }
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
      application.goInFuture(1)
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
    onEnter: () => application.goInFuture(7)
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
    async onTimeout() {
      currentStep.value = TutorialSteps.TutorialEnd
      application.switchContextTo('main')
    }
  },
])
</script>

<style scoped>
.confetti {
  position: absolute;
  top: 5%;
  left: 50%;
}
</style>