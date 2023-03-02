import { InboxCard, Verse } from '@akdasa-studios/shlokas-core'
import { VerseCardViewModel } from '@/app/decks/shared'
import { hashString } from '@/app/utils/hashString'

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

  get color()   { return 'side-color-' + (1+(hashString(this.verseNumber + this.type.toString()) % 8)) }
}
