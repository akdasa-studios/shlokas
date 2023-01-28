import { Verse } from '@akdasa-studios/shlokas-core'
import { CardViewModel } from '@/app/decks/shared'

export abstract class VerseCardViewModel extends CardViewModel {
  constructor(
    private readonly verse: Verse
  ) { super() }

  abstract get id(): string
  get verseId()     { return this.verse.id }
  get verseNumber() { return this.verse.number.toString() }
  get text()        { return this.verse.text.lines }
  get translation() { return this.verse.translation.text }
  get synonyms()    { return this.verse.synonyms }
}
