import { TutorialSteps, useTutorialStore } from '@/app/tutorial'


export function canUserSwipeCardsUpInInboxDeck(
  direction: string
) {
  const tutorial = useTutorialStore()

  if (tutorial.inProgress) {
    const isUserWasAskedToSwipeCardsUp = tutorial.atStep(TutorialSteps.InboxDeckSwipeCardUp)
    const isUserSwipingCardsUp = ['up', 'bottom'].includes(direction)
    if (!isUserWasAskedToSwipeCardsUp && isUserSwipingCardsUp) { tutorial.invalidAction(); return false }
    if (isUserWasAskedToSwipeCardsUp && !isUserSwipingCardsUp) { tutorial.invalidAction(); return false }
  }
  return true
}