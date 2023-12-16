import { Direction } from '@/app/decks/shared'
import { TutorialSteps, useTutorialStore } from '@/app/tutorial'

/**
 * A user is not allowed to swipe cards up until he is asked for it.
 */
export function canUserSwipeCardsUpInInboxDeck(
  direction: Direction
) {
  const tutorial = useTutorialStore()

  if (!tutorial.inProgress) { return true }

  const isUserWasAskedToSwipeCardsUp = tutorial.atStep(TutorialSteps.InboxDeckSwipeCardUp)
  const isUserSwipingCardsUp = ['up', 'bottom'].includes(direction)
  if (!isUserWasAskedToSwipeCardsUp && isUserSwipingCardsUp) { tutorial.invalidAction(); return false }
  if (isUserWasAskedToSwipeCardsUp && !isUserSwipingCardsUp) { tutorial.invalidAction(); return false }

  return true
}
