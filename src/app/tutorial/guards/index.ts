import { canUserSwipeCardsUpInInboxDeck } from './inboxDeck'
import { canUserAddVerse } from './library'

export const TutorialGuards = {
  Library: {
    canUserAddVerse
  },
  InboxDeck: {
    canUserSwipeCardsUpInInboxDeck
  }
}
