import { Verse } from '@akdasa-studios/shlokas-core'
import { CardViewModel } from '@/app/decks/shared'
import { getContentUrl } from '@/app/Env'

export abstract class VerseCardViewModel extends CardViewModel {
  constructor(
    public readonly verse: Verse
  ) { super() }

  abstract get id(): string
  get verseId() { return this.verse.id }
  get verseNumber() { return this.verse.number.toString() }
  get text() { return this.verse.text.lines }
  get translation() { return this.verse.translation.text }
  get synonyms() { return this.verse.synonyms }
  get textAudioUri() {
    return ''
  }
  get textImageUri() {
    return ''
  }
}
