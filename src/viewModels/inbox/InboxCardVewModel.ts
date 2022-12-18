import { root } from '@/application'
import { CardId, InboxCard, InboxCardMemorized, Verse } from '@akdasa-studios/shlokas-core'
import { markRaw, ref } from 'vue'

/**
 * Represents a card in the inbox created from a verse.
 */
export class InboxCardVewModel {
  private _card: InboxCard
  private _verse: Verse
  public _progress = ""

  constructor(
    card: InboxCard,
    verse: Verse,
  ) {
    this._card = markRaw(card)
    this._verse = markRaw(verse)
  }

  get id(): CardId {
    return this._card.id;
  }

  get type(): string {
    return this._card.type;
  }

  get verseNumber(): string {
    return this._verse.number.toString();
  }

  get text() { return this._verse.text.lines }

  get synonims() {
    return this._verse.synonyms.map(x => ({
      word: x.word,
      translation: x.translation
    }))
  }

  get translation(): string {
    return this._verse.translation.text;
  }

  get progress() { return this._progress }

  memorized() {
    root.execute(new InboxCardMemorized(this._card))
    root.inbox.sync()
  }

  setProgress(value: string) {
    this._progress = value
  }
}
