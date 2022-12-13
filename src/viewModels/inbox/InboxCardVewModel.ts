import { Application } from '@akdasa-studios/shlokas-core'
import { InboxCardMemorized } from '@akdasa-studios/shlokas-core'
import { CardId, InboxCard } from '@akdasa-studios/shlokas-core'
import { Verse } from '@akdasa-studios/shlokas-core'


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
    private readonly context: Application,
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
    this.context.processor.execute(command)
    this._updated()
  }
}
