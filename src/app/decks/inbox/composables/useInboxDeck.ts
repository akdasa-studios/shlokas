import { Application, InboxCardMemorized, UpdateVerseStatus } from '@akdasa-studios/shlokas-core'
import { useArrayFilter, useArrayFind } from '@vueuse/core'
import { computed } from 'vue'
import { InboxVerseCardViewModel, useInboxDeckStore } from '@/app/decks/inbox'
import { useToast } from '@/app/composables'


export function useInboxDeck(app: Application) {
  const inboxDeckStore     = useInboxDeckStore()
  const cardMemorizedToast = useToast()
  const cardsToShow = useArrayFilter(inboxDeckStore.cards, x => x.index < 3)
  const topCard     = useArrayFind(inboxDeckStore.cards, x => x.index === 0)
  const isEmpty     = computed(() => inboxDeckStore.cards.length === 0)

  /**
   * Shifts the top card to the bottom of the deck.
   */
  function shiftTopCard() {
    inboxDeckStore.shiftTopCard()
  }

  /**
   * Removes the top card from the deck and marks it as memorized.
   */
  async function memorizeTopCard() {
    const cardViewModel = inboxDeckStore.removeTopCard() as InboxVerseCardViewModel
    if (cardViewModel) {
      const inboxCard = cardViewModel.card
      await app.processor.execute(new InboxCardMemorized(inboxCard))
      await app.processor.execute(new UpdateVerseStatus(inboxCard.verseId))
      cardMemorizedToast.open()
    }
  }

  /**
   * Reverts the last action.
   */
  async function revert() {
    await app.processor.revert()
  }

  return {
    cardsToShow, isEmpty,
    cardMemorizedToast,
    shiftTopCard,
    memorizeTopCard,
    revert,
    topCard,
    // addCardsToDeck
  }
}