import { InboxCard, Verse } from '@akdasa-studios/shlokas-core'
import { CardViewModel } from '@/app/decks/shared/CardViewModel'

export class InboxCardViewModel extends CardViewModel {
  public readonly _card: InboxCard

  constructor(card: InboxCard, verse: Verse, index: number) {
    super(verse)
    this._card = card
    this.index.value = index
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  get id()      { return this._card.id.value }
  get type()    { return this._card.type }
  get addedAt() { return this._card.addedAt }
}
