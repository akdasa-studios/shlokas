import { InboxCard, Verse } from '@akdasa-studios/shlokas-core'
import { CardViewModel } from '@/app/decks/CardViewModel'
import { ViewModel } from '@/app/DomainViewModel'

export class InboxCardViewModel extends CardViewModel implements ViewModel {
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

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() {
    super.sync()
  }
}
