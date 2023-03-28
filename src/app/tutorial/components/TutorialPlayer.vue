<template>
  <div>
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

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCardClicked() {
  tutorialStore.completeStep()
}


// const TUTORIAL
tutorialStore.registerSteps([
  { id: TutorialSteps.OpenInboxDeck, text: 'Это колода "Входящие". Каждый стих здесь разбивается на две карточки: текст и перевод.' },
  { id: TutorialSteps.SwipeInboxCardLeft, text: 'Смахните карточку влево чтобы перейти к следущей.' },
  { id: TutorialSteps.FlipInboxCard, text: 'На обратной стороне карточки находится проигрыватель и пословный перевод. Нажмите чтобы перевернуть.' },
  { id: TutorialSteps.PlayDeclamation, text: 'Нажмите на круг чтобы включить воспроизведение. Количество повторов можно изменить в настройках.' },
  { id: TutorialSteps.FlipInboxCardAgain, text: 'Переверните карточку, воспроизведение продолжится' },
  { id: TutorialSteps.SwipeInboxCardUp, text: 'Как только вы выучили карточку, то можете смахнуть её вверх.' },
  { id: TutorialSteps.OpenReviewDeck, text: 'Это колода "Обзор". Сюда попадают уже запомненные вами карточки. На сегодня у вас нет запланированных карточек. Переместимся на завтра.', onLeave: nextDay },
  { id: TutorialSteps.AnswerQuestion, text: 'На передней стороне вопрос, на обратной ответ. Впомните ответ и переверните карточку.' },
  { id: TutorialSteps.GradeCard, text: 'Поставьте себе оценку', position: 'aboveGradeButtons' },
  { id: TutorialSteps.WeekForward, text: 'Отлично! Теперь переместимся на неделю вперёд! Вжух!', onLeave: () => nextDay(7) },
  { id: TutorialSteps.MultipleCards, text: 'У карточек разные вопросы, попробуйте ответить на все и поставить себе оценку', position: 'aboveGradeButtons' },
])

function nextDay(days=1) {
  app.timeMachine.set(
    app.timeMachine.add(app.timeMachine.now, 24*days, 'h')
  )
}

const tutorial = ref()
// setInterval(() => tutorial.value.next(), 5000)
</script>
