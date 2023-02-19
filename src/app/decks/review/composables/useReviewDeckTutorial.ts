import { useReviewDeckStore } from '@/app/decks/review'
import { TutorialCardViewModel, useTutorialStore } from '@/app/decks/shared'


export function useReviewDeckTutorial() {
  const reviewDeckStore = useReviewDeckStore()
  const tutorialStore = useTutorialStore()
  const TUTORIAL_CARDS = [
    'review.questionAnswer',
    'review.intervals',
  ]

  /**
   * Adds tutorial cards to the Inbox deck
   */
  function addTutorialCards() {
    if (!tutorialStore.enabled) { return }
    TUTORIAL_CARDS.reverse().forEach(
      cardId => addTutorialCard(cardId)
    )
  }

  /**
   * Tutorial card has been swiped. Mark it is as completed
   * and remove it from the Review deck.
   * @param card The card that has been swiped.
   */
  function tutorialCardSwiped(card: TutorialCardViewModel) {
    tutorialStore.completeStep(card.id)
    reviewDeckStore.removeTopCard()
  }

  /**
   * Adds tutorial card to the Review deck.
   * @param id Id of the tutorial card.
   */
  function addTutorialCard(id: string) {
    const isAlreadyInDeck = reviewDeckStore.hasCard(id)
    const isCompleted     = tutorialStore.isStepCompleted(id)
    if (!isAlreadyInDeck && !isCompleted) {
      reviewDeckStore.addCard(new TutorialCardViewModel(id))
    }
  }

  return {
    addTutorialCards,
    tutorialCardSwiped,
  }
}