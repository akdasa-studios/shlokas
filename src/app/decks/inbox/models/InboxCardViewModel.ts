import { InboxCard, Verse } from '@akdasa-studios/shlokas-core'
import { Ref, ref } from 'vue'
import { CardViewModel } from '@/app/decks/CardViewModel'
import { ViewModel } from '@/app/DomainViewModel'

interface ICard {
  id: string,
  index: Ref<number>
}

export class InboxCardViewModel extends CardViewModel implements ViewModel, ICard {
  public readonly _card: InboxCard

  constructor(card: InboxCard, verse: Verse, index = 0) {
    super(verse)
    this._card = card
    this.index.value = index
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  index = ref(0)
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
