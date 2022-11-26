import { InboxCard } from '@/models/cards'


/**
 * Inbox deck.
 */
export class InboxDeck {
  private _cards: InboxCard[]

  /**
   * Initializes a new instance of InboxDeck class.
   * @param cards Initial cards
   */
  constructor(
    cards: InboxCard[],
  ) {
    this._cards = cards
  }

  /**
   * Returns the cards in the deck in the order they were added.
   */
  get cards(): InboxCard[] {
    return this._cards.sort((x, y) => x.addedAt.getTime() - y.addedAt.getTime())
  }

  /**
   * Adds the given card to the deck.
   * @param card Card to add to the deck
   */
  addCard(card: InboxCard) {
    this._cards.push(card)
  }

  /**
   * Removes the given card from the deck.
   * @param card Card to remove from the deck
   */
  removeCard(card: InboxCard) {
    this._cards = this._cards.filter(x => x.id !== card.id)
  }
}