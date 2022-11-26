import { Result } from '@akdasa-studios/framework/core'
import { Aggregate, UuidIdentity } from '@akdasa-studios/framework/domain/models'

import { VerseNumber, Transliteration, NoTransliteration, Translation, NoTranslation, Synonym, UnknownVerseNumber } from '@/models/verse'
import { Language, UnknownLanguage } from '@/models/language'


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

export class VerseBuilder {
  private _id?: VerseId
  private _number: VerseNumber = UnknownVerseNumber
  private _language: Language = UnknownLanguage
  private _transliteration: Transliteration = NoTransliteration
  private _translation: Translation = NoTranslation
  private _synonyms: Synonym[] = []

  withNumber(number: VerseNumber): VerseBuilder {
    this._number = number
    return this
  }

  ofLanguage(language: Language): VerseBuilder {
    this._language = language
    return this
  }

  withTransliteration(transliteration: Transliteration): VerseBuilder {
    this._transliteration = transliteration
    return this
  }

  withTranslation(translation: Translation): VerseBuilder {
    this._translation = translation
    return this
  }

  build(): Result<Verse, string> {
    const id = this._id || new VerseId()
    const verse = new Verse(
      id,
      this._number,
      this._language,
      this._transliteration,
      this._translation,
      this._synonyms
    )
    return Result.ok(verse)
  }
}