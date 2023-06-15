<template>
  <div>
    <ConfettiExplosion
      v-if="showConfetti"
      class="confetti"
      :force=".3"
      :duration="5000"
    />
    <TutorialCards
      :cards="tutorialSteps"
      :step="currentStep"
      :last-invalid-action-at="lastInvalidActionAt"
    />

    <ion-picker
      :is-open="isSadhanaModalOpen"
      :columns="notificationTimeColumns"
      :buttons="notificationTimeButtons"
    />

    <ion-picker
      :is-open="isMemorizingDurationPickerVisible"
      :columns="memorizingTimeColumns"
      :buttons="memorizingTimeButtons"
    />
  </div>
</template>


<script lang="ts" setup>
import { IonPicker } from '@ionic/vue'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { TutorialCards, TutorialStep, TutorialSteps, useTutorialStore } from '@/app/tutorial'
import { useApplication, ConfettiExplosion, useScheduleNotifications, go } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'


const notificationTimeColumns = [
  {
    name: 'hour',
    options: [
      { text: '00', value: 0, },
      { text: '01', value: 1, },
      { text: '02', value: 2, },
      { text: '03', value: 3, },
      { text: '04', value: 4, },
      { text: '05', value: 5, },
      { text: '06', value: 6, },
      { text: '07', value: 7, },
      { text: '08', value: 8, },
      { text: '09', value: 9, },
      { text: '10', value: 10, },
      { text: '11', value: 11, },
      { text: '12', value: 12, },
      { text: '13', value: 13, },
      { text: '14', value: 14, },
      { text: '15', value: 15, },
      { text: '16', value: 16, },
      { text: '17', value: 17, },
      { text: '18', value: 18, },
      { text: '19', value: 19, },
      { text: '20', value: 20, },
      { text: '21', value: 21, },
      { text: '22', value: 22, },
      { text: '23', value: 23, },
    ],
  },
  {
    name: 'minute',
    options: [
      { text: '00', value: 0 },
      { text: '05', value: 5 },
      { text: '10', value: 10 },
      { text: '15', value: 15 },
      { text: '20', value: 20 },
      { text: '25', value: 25 },
      { text: '30', value: 30 },
      { text: '35', value: 35 },
      { text: '40', value: 40 },
      { text: '45', value: 45 },
      { text: '50', value: 50 },
      { text: '55', value: 55 },
    ]
  }
]

const memorizingTimeColumns = [
  {
    name: 'time',
    options: [
      { text: '5', value: 5, },
      { text: '10', value: 10, },
      { text: '15', value: 15, },
      { text: '20', value: 20, },
      { text: '25', value: 25, },
      { text: '30', value: 30, },
      { text: '45', value: 45, },
      { text: '60', value: 60, },
    ],
  },
]

const notificationTimeButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      settingsStore.enableNotifications = false
      goToTheNextStep()
    }
  },
  {
    text: 'Confirm',
    handler: (value: any) => {
      settingsStore.enableNotifications = true
      settingsStore.notificationTime = [
        [value.hour.value, value.minute.value]
      ]
      goToTheNextStep()
    },
  }
]

const memorizingTimeButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      goToTheNextStep()
    }
  },
  {
    text: 'Confirm',
    handler: (value: any) => {
      settingsStore.memorizingTime = value.time.value
      goToTheNextStep()
    },
  }
]

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const application = useApplication()
const tutorialStore = useTutorialStore()
const settingsStore = useSettingsStore()
const scheduleNotifications = useScheduleNotifications()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { currentStep, lastInvalidActionAt } = storeToRefs(tutorialStore)
const showConfetti = ref(false)
const isSadhanaModalOpen = ref(false)
const isMemorizingDurationPickerVisible = ref(false)

const tutorialSteps: TutorialStep[] = [
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
        // tutorialStore.currentStep = TutorialSteps.ConfigIntroduction
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
    onEnter: async () => application.goInFuture(7)
  },

  {
    id: TutorialSteps.ReviewDeckEnd,
    text: 'tutorial.reviewDeck.end',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.ConfigIntroduction,
    text: 'tutorial.config.introduction',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.ConfigNotificationTimeIntro,
    text: 'tutorial.config.notificationsIntro',
    duration: 5000,
    onTimeout: async () => {
      await scheduleNotifications.requestPermissions()
      goToTheNextStep()
    },
  },

  {
    id: TutorialSteps.ConfigNotificationTimeUserSets,
    onEnter: async () => {
      isSadhanaModalOpen.value = true
    },
  },

  {
    id: TutorialSteps.ConfigMemorizeTimeInto,
    text: 'tutorial.config.memorizeTimeIntro',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.ConfigMemorizeTimeUserSets,
    onEnter: async () => {
      // NOTE: setTimeout is workaround that fixes issue of not showing picker
      setTimeout(() => { isMemorizingDurationPickerVisible.value = true }, 10)
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   Finish                                   */
  /* -------------------------------------------------------------------------- */

  {
    id: TutorialSteps.TutorialCongratulations,
    text: 'tutorial.congratulations',
    duration: 5000,
    onEnter: async () => {
      showConfetti.value = true
    },
    async onTimeout() {
      currentStep.value = TutorialSteps.TutorialEnd
      application.switchContextTo('main')
    }
  },
]

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(currentStep, onStepChanged, { immediate: true })

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onStepChanged(current: TutorialSteps, prev: TutorialSteps | undefined) {
  const prevStep = prev ? tutorialSteps[prev] : undefined
  const currStep = tutorialSteps[current]

  if (prevStep && prevStep.onLeave) { await prevStep.onLeave() }
  if (currStep && currStep.onEnter) { await currStep.onEnter() }
}


function goToTheNextStep() {
  tutorialStore.completeStep(tutorialStore.currentStep)
}
</script>


<style scoped>
.confetti {
  position: absolute;
  top: 5%;
  left: 50%;
}
ion-modal {
  --height: auto;
  --width: 100%
}
</style>