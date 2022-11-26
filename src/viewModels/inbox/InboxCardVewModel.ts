import { InboxContext } from '@/commands/inbox'
import { InboxCardMemorized } from '@/commands/inbox'
import { CardId, InboxCard } from '@/models/cards'
import { Verse } from '@/models/verse'


/**
 * Represents a card in the inbox created from a verse.
 */
export class InboxCardVewModel {
  private _card: InboxCard
  private _verse: Verse
  private _updated: () => void = () => { console.log("sdsd") }

  /**
   * Initializes a new instance of InboxCardVewModel class.
   * @param card Inbox card.
   * @param verse Verse related to the card.
   */
  constructor(
    private readonly context: InboxContext,
    card: InboxCard,
    verse: Verse,
    updated: () => void
  ) {
    this._card = card
    this._verse = verse
    this._updated = updated
  }

  /**
   * Gets id of the card.
   * @returns Id of the card.
   */
  get id(): CardId {
    return this._card.id;
  }

  /**
   * Gets type of the card.
   * @returns Type of the card.
   */
  get type(): string {
    return this._card.type;
  }

  /**
   * Gets string representation of the verse number.
   * @returns String representation of the verse number.
   */
  get verseNumber(): string {
    return this._verse.number.toString();
  }

  get translation(): string {
    return this._verse.translation.text;
  }

  memorized() {
    const command = new InboxCardMemorized(this._card)
    command.execute(this.context)
    this._updated()
  }
}
