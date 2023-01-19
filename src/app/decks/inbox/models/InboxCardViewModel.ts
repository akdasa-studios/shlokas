import { InboxCard, Verse } from '@akdasa-studios/shlokas-core'
import { ref } from 'vue'
import { CardViewModel } from '@/app/decks/shared/CardViewModel'

export enum MemorizingStatus {
  Unknown,
  StillMemorizing,
  Memorized
}

export class InboxCardViewModel extends CardViewModel {
  public readonly _card: InboxCard

  constructor(card: InboxCard, verse: Verse, index: number) {
    super(verse)
    this._card = card
    this.index.value = index
  }

  memorizingStatus = ref<MemorizingStatus>(MemorizingStatus.Unknown)

  get id()      { return this._card.id.value }
  get type()    { return this._card.type }
  get addedAt() { return this._card.addedAt }
}
