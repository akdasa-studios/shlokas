import { InboxDeck } from "@/models/decks"

/**
 * The context for the inbox commands.
 */
export class InboxContext {
  private _deck: InboxDeck

  /**
   * Initializes a new instance of the InboxContext class.
   * @param deck The inbox deck.
   */
  constructor(
    deck: InboxDeck,
  ) {
    this._deck = deck
  }

  /**
   * Gets the inbox deck.
   * @returns The inbox deck.
   */
  get deck(): InboxDeck {
    return this._deck
  }
}