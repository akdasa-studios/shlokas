import { Aggregate, UuidIdentity } from '@akdasa-studios/framework/domain/models'

import { VerseNumber, VerseTransliteration, VerseTranslation } from '@/models/verse'
import { Language } from '@/models/language'
import { Synonym } from '@/models/synonym'


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
    public readonly transliteration: VerseTransliteration,
    public readonly translation: VerseTranslation,
    public readonly synonyms: Synonym[],
  ) {
    super(id)
  }
}