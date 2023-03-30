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
    id: TutorialSteps.OverallIntriduction,
    text: 'Добро пожаловать в "Учи Шлоки!" Пандитджи, желаете ли пройти обучение?',
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
    text: 'Это библиотека. Тут вы можете найти шлоку которую хотите выучить',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.LibrarySearch,
    text: 'Вы можете искать шлоки в списке или по номеру и содержанию. Попробуйте найти какую-нибудь шлоку'
  },


  {
    id: TutorialSteps.LibraryOpenVerse,
    text: 'Откройте шлоку'
  },

  {
    id: TutorialSteps.LibraryAddVerse,
    text: 'Чтобы начать учить шлоку нужно добавить её в колоду "Входящие", для этого нажмите "Добавить"'
  },

  {
    id: TutorialSteps.LibraryEnd,
    text: 'Шлока добавлена. Давайте её выучим. Перейдите во "Входящие"'
  },


  /* -------------------------------------------------------------------------- */
  /*                                    Inbox                                   */
  /* -------------------------------------------------------------------------- */

  {
    id: TutorialSteps.InboxDeckIntroduction,
    text: 'Это колода "Входящие". Каждый стих здесь разбивается на две карточки: текст и перевод.',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.InboxDeckSwipeCardLeft,
    text: 'Смахните карточку влево чтобы перейти к следущей. Карточки переключаются по кругу.'
  },

  {
    id: TutorialSteps.InboxDeckFlipCard,
    text: 'На обратной стороне карточки находится проигрыватель и пословный перевод. Нажмите чтобы перевернуть.'
  },

  {
    id: TutorialSteps.InboxDeckPlayDeclamation,
    text: 'Нажмите на круг чтобы включить воспроизведение. Каждая строчка повторяется несколько раз. Ниже отображается пословный перевод'
  },

  {
    id: TutorialSteps.InboxDeckFlipCardAgain,
    text: 'Вы можете перевернуть карточку и смотреть текст шлоки. Переверните карточку'
  },

  {
    id: TutorialSteps.InboxDeckSwipeCardUp,
    text: 'Как только вы выучили карточку, а на это может потребоваться несколько дней, то смахните её вверх. Смахните все карточки вверх.'
  },

  {
    id: TutorialSteps.InboxDeckEnd,
    text: 'Вы запомнили все карточки! Перйдите в колоду "Обзор"'
  },


  /* -------------------------------------------------------------------------- */
  /*                                   Review                                   */
  /* -------------------------------------------------------------------------- */

  {
    id: TutorialSteps.OpenReviewDeck,
    text: 'Это колода "Обзор". Сюда попадают уже запомненные вами карточки. На сегодня у вас нет запланированных карточек, но есть на завтра. Переместимся на завтра.',
    buttons: [
      { id: 'go', text: 'common.forward', color: 'success' },
    ],
    onButtonClicked: () => {
      nextDay()
      goToTheNextStep()
    }
  },

  {
    id: TutorialSteps.AnswerQuestion,
    text: 'На передней стороне карточки находится вопрос, на обратной стороне ответ. Впомните ответ и переверните карточку, чтобы проверить свои знания'
  },

  {
    id: TutorialSteps.GradeCard,
    text: 'Поставьте себе оценку. В зависимости от оценки период следущего повторения будет изменяться. Вы можете видеть его на кнопке',
    position: 'aboveGradeButtons'
  },

  {
    id: TutorialSteps.WeekForward,
    text: 'Отлично! Теперь переместимся на неделю вперёд! На каждый стих создаётся несколько карточек с разными вопросами. Проверим как это выглядит!',
    buttons: [
      { id: 'go', text: 'Go', color: 'success' },
    ],
    onButtonClicked: () => {
      nextDay(7)
      goToTheNextStep()
    }
  },

  {
    id: TutorialSteps.MultipleCards,
    text: 'Ппробуйте ответить на все карточки и поставить себе оценку',
    duration: 5000
  },

  {
    id: TutorialSteps.ReviewDone,
    text: 'Отлично! Вы просмотрели все карточки!',
    duration: 5000,
    onTimeout: goToTheNextStep
  },

  {
    id: TutorialSteps.TutorialDone,
    text: 'Поздравляем! Пандитджи, вы закончили обучение!',
    duration: 5000,
    onEnter: () => {
      showConfetti.value = true
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