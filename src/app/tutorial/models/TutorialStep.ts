export interface TutorialButton {
  id: string
  text: string
  color: string
}

export interface TutorialStep {
  id: number
  text?: string
  actionText?: string
  position?: string
  duration?: number
  buttons?: TutorialButton[]
  onButtonClicked?: (buttonId: string) => void
  onTimeout?: () => void
  onLeave?: () => Promise<void>
  onEnter?: () => Promise<void>
}

export enum TutorialSteps {
  OverallIntroduction,

  LibraryIntroduction,
  LibraryOpenVerse,
  LibraryAddVerse,
  LibraryEnd,

  InboxDeckIntroduction,
  InboxDeckSwipeCardLeft,
  InboxDeckFlipCard,
  InboxDeckPlayDeclamation,
  InboxDeckFlipCardAgain,
  InboxDeckSwipeCardUp,
  InboxDeckEnd,

  ReviewDeckIntroduction,
  ReviewDeckQuestionAndAnswer,
  ReviewDeckGradeCard,
  ReviewDeckGoToFuture,
  ReviewDeckGradeAllCards,
  ReviewDeckEnd,

  ConfigIntroduction,
  ConfigNotificationTimeIntro,
  ConfigNotificationTimeUserSets,
  ConfigMemorizeTimeInto,
  ConfigMemorizeTimeUserSets,

  TutorialCongratulations,
  TutorialEnd
}