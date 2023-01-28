import { InboxCard, Verse } from '@akdasa-studios/shlokas-core'
import { VerseCardViewModel } from '@/app/decks/shared'

export enum MemorizingStatus {
  Unknown,
  StillMemorizing,
  Memorized
}

export class InboxVerseCardViewModel extends VerseCardViewModel {
  public readonly card: InboxCard

  constructor(card: InboxCard, verse: Verse) {
    super(verse)
    this.card = card
  }

  memorizingStatus = MemorizingStatus.Unknown

  get id()      { return this.card.id.value }
  get type()    { return this.card.type }
  get addedAt() { return this.card.addedAt }
}
