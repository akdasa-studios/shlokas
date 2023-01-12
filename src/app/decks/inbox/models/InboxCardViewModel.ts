import { InboxCard, Verse } from '@akdasa-studios/shlokas-core'
import { CardViewModel } from '@/app/decks/CardViewModel'
import { ViewModel } from '@/app/DomainViewModel'


export class InboxCardViewModel extends CardViewModel implements ViewModel {
  public readonly _card: InboxCard

  constructor(card: InboxCard, verse: Verse) {
    super(verse)
    this._card = card
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  // id = computed(() =>  this._card.ref.value.id)
  get id()      { return this._card.id }
  get type()    { return this._card.type }
  get addedAt() { return this._card.addedAt }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() {
    super.sync()
  }
}
