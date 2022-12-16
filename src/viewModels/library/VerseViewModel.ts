import { Decks, Text, Translation, Verse, VerseBuilder, VerseNumber, VerseStatus, VerseStatusId } from '@akdasa-studios/shlokas-core'
import { SyncableViewModel } from '@/viewModels/SyncableViewModel'

export class VerseViewModel {
  public readonly $verse: SyncableViewModel<Verse>
  public readonly $verseStatus: SyncableViewModel<VerseStatus>

  constructor(
    verse: Verse,
    verseStatus: VerseStatus
  ) {
    this.$verse = new SyncableViewModel<Verse>(verse)
    this.$verseStatus = new SyncableViewModel<VerseStatus>(verseStatus)
  }

  sync() {
    // this.$verse.sync()
    this.$verseStatus.sync()
  }

  get isAlreadyAdded(): boolean {
    return this.$verseStatus.object.inDeck !== Decks.None
  }

  get showStatus(): boolean {
    return this.$verseStatus.object.inDeck !== Decks.None
  }

  get status(): string {
    return  this.$verseStatus.object.inDeck.toUpperCase()
  }

  get number(): string {
    return this.$verse.object.number.toString()
  }

  get translation(): string {
    return this.$verse.object.translation.text
  }

  get text(): string[] {
    return this.$verse.object.text.lines
  }

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