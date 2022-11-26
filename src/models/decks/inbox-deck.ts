import { InboxCard } from '@/models/cards'


export class InboxDeck {
  private _cards: InboxCard[]

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

  addCard(card: InboxCard) {
    this._cards.push(card)
  }

  removeCard(card: InboxCard) {
    this._cards = this._cards.filter(x => x.id !== card.id)
  }
}