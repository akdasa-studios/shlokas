import { defineStore } from 'pinia'
import { CardViewModel, Deck } from "@/app/decks/shared"
import { ReviewCardViewModel } from '../viewModels/ReviewCardViewModel'


export const useReviewDeckStore = defineStore('decks/review', () => {
  const deck = new Deck<ReviewCardViewModel>()

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