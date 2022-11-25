import { Aggregate, UuidIdentity } from '@akdasa-studios/framework/domain/models'

import { VerseNumber, Transliteration, Translation, Synonym } from '@/models/verse'
import { Language } from '@/models/language'


/**
 * Verse Identity
 */
export class VerseId extends UuidIdentity<'VerseId'> {}

/**
 * Verse
 */
export class Verse extends Aggregate<VerseId> {
  constructor(
    id: VerseId,
    public readonly number: VerseNumber,
    public readonly language: Language,
    public readonly transliteration: Transliteration,
    public readonly translation: Translation,
    public readonly synonyms: Synonym[],
  ) {
    super(id)
  }
}