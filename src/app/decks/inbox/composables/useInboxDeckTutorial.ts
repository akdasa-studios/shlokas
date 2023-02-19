import { useInboxDeckStore } from '@/app/decks/inbox'
import { TutorialCardViewModel, useTutorialStore } from '@/app/decks/shared'


export function useInboxDeckTutorial() {
  const inboxDeckStore = useInboxDeckStore()
  const tutorialStore = useTutorialStore()
  const TUTORIAL_CARDS = [
    'inbox.cards',
    'inbox.overall',
    'inbox.verse',
    'inbox.final'
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
   * and remove it from the Inbox deck.
   * @param card The card that has been swiped.
   */
  function tutorialCardSwiped(card: TutorialCardViewModel) {
    tutorialStore.completeStep(card.id)
    inboxDeckStore.removeTopCard()
  }

  /**
   * Adds tutorial card to the Inbox deck.
   * @param id Id of the tutorial card.
   */
  function addTutorialCard(id: string) {
    const isAlreadyInInbox = inboxDeckStore.hasCard(id)
    const isCompleted      = tutorialStore.isStepCompleted(id)
    if (!isAlreadyInInbox && !isCompleted) {
      inboxDeckStore.addCard(new TutorialCardViewModel(id))
    }
  }

  return {
    tutorialCardSwiped,
    addTutorialCards
  }
}