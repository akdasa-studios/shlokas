import { UuidIdentity, Aggregate } from '@akdasa-studios/framework/domain/models'
import { VerseId } from '@/models/verse'


export class CardId extends UuidIdentity<'CardId'> {}

export abstract class Card extends Aggregate<CardId> {
  constructor(
    id: CardId,
    public readonly verseId: VerseId
  ) {
    super(id)
  }
}