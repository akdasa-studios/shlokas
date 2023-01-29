import { defineStore } from 'pinia'
import { InboxCardViewModel } from "@/app/decks/inbox"
import { Deck, CardViewModel } from '@/app/decks/shared'


export const useInboxDeckStore = defineStore('decks/inbox', () => {
  const deck = new Deck<InboxCardViewModel>()

  function hasCard(id: string) { return deck.hasCard(id) }
  function addCard(card: CardViewModel) { deck.addCard(card) }
  function shiftTopCard() { deck.shiftTopCard() }
  function removeTopCard() { return deck.removeTopCard() }
  function removeCardById(id: string) { return deck.removeCardById(id) }

  return {
    cards: deck.cards,
    count: deck.count,
    shiftTopCard: shiftTopCard,
    removeTopCard: removeTopCard,
    addCard: addCard,
    removeCardById: removeCardById,
    hasCard: hasCard
  }
})
