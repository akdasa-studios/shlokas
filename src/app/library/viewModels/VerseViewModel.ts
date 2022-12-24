import { Decks, Text, Translation, Verse, VerseBuilder, VerseId, VerseNumber, VerseStatus, VerseStatusId } from '@akdasa-studios/shlokas-core'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'

export class VerseViewModel implements ViewModel {
  private readonly _verse: DomainViewModel<Verse>
  private readonly _status: DomainViewModel<VerseStatus>

  constructor(
    verse: Verse,
    verseStatus: VerseStatus
  ) {
    this._verse = new DomainViewModel<Verse>(verse)
    this._status = new DomainViewModel<VerseStatus>(verseStatus)
  }

  sync() {
    this._verse.sync()
    this._status.sync()
  }

  get verse(): Verse { return this._verse.object }
  get verseId(): VerseId { return this._verse.object.id }
  get isAlreadyAdded(): boolean { return this._status.object.inDeck !== Decks.None }
  get showStatus(): boolean { return this._status.object.inDeck !== Decks.None }
  get status(): string { return  this._status.object.inDeck.toUpperCase() }
  get number(): string { return this._verse.object.number.toString() }
  get translation(): string { return this._verse.object.translation.text }
  get text(): string[] { return this._verse.object.text.lines }

  static get empty() : VerseViewModel {
    const dummyVerse = new VerseBuilder()
      .withNumber(new VerseNumber('????'))
      .withText(new Text(['????']))
      .withTranslation(new Translation('????'))
      .build().value
    return new VerseViewModel(
      dummyVerse,
      new VerseStatus(new VerseStatusId(), dummyVerse.id)
    )
  }
}