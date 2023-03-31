export interface TutorialButton {
  id: string
  text: string
  color: string
}

export interface TutorialStep {
  id: number
  text: string
  actionText?: string
  position?: string
  duration?: number
  buttons?: TutorialButton[]
  onButtonClicked?: (buttonId: string) => void
  onTimeout?: () => void
  onLeave?: () => void
  onEnter?: () => void
}

export enum TutorialSteps {
  OverallIntriduction,

  LibraryIntroduction,
  LibrarySearch,
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

  OpenReviewDeck,
  AnswerQuestion,
  GradeCard,
  WeekForward,
  MultipleCards,
  ReviewDone,

  TutorialCongratulations,
  TutorialEnd
}