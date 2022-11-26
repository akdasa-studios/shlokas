import { VerseId } from '@/models/verse'
import { Card, CardId } from './card'


export enum InboxCardType {
  Transliteration = 'Transliteration',
  Translation = 'Translation',
}

export class InboxCard extends Card {
  /**
   * Initialize a new instance of InboxCard class with the given parameters.
   * @param id Identity of the card
   * @param verseId Verse identity
   * @param inboxCardType Type of the card
   * @param addedAt Added at
   */
  constructor(
    id: CardId,
    verseId: VerseId,
    public readonly inboxCardType: InboxCardType,
    public readonly addedAt: Date,
  ) {
    super(id, verseId)
  }
}

export class InboxCardBuilder {
  private _id?: CardId
  private _verseId?: VerseId
  private _inboxCardType?: InboxCardType
  private _addedAt?: Date

  ofVerse(verseId: VerseId): InboxCardBuilder {
    this._verseId = verseId
    return this
  }

  ofType(inboxCardType: InboxCardType): InboxCardBuilder {
    this._inboxCardType = inboxCardType
    return this
  }

  addedAt(addedAt: Date): InboxCardBuilder {
    this._addedAt = addedAt
    return this
  }

  build(): InboxCard {
    return new InboxCard(
      this._id || new CardId(),
      this._verseId as VerseId,
      this._inboxCardType as InboxCardType,
      this._addedAt as Date
    )
  }
}