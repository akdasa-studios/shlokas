import { CardId, InboxCard, InboxCardMemorized, Verse } from '@akdasa-studios/shlokas-core'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'
import { root } from '@/application'

/**
 * Represents a card in the inbox created from a verse.
 */
export class InboxCardViewModel implements ViewModel {
  private readonly _card: DomainViewModel<InboxCard>
  private readonly _verse: DomainViewModel<Verse>

  constructor(
    card: InboxCard,
    verse: Verse,
  ) {
    this._card = new DomainViewModel(card)
    this._verse = new DomainViewModel(verse)
  }

  sync(): void {
    this._card.sync()
    this._verse.sync()
  }

  get id(): CardId { return this._card.object.id }
  get type(): string { return this._card.object.type }
  get verseNumber(): string { return this._verse.object.number.toString() }
  get text() { return this._verse.object.text.lines }
  get translation(): string { return this._verse.object.translation.text }
  get synonyms() : {word:string, translation:string}[] {
    return this._verse.object.synonyms.map(x => ({
      word: x.word,
      translation: x.translation
    }))
  }

  memorized() {
    root.execute(new InboxCardMemorized(this._card.object))
    root.inboxDeck.sync()
    root.reviewDeck.sync()
  }
}
