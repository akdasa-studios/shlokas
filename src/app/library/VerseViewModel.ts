import { Decks, Text, Translation, Verse, VerseBuilder, VerseNumber, VerseStatus, VerseStatusId } from '@akdasa-studios/shlokas-core'
import { computed } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'

export class VerseViewModel implements ViewModel {
  private readonly _verse: DomainViewModel<Verse>
  private readonly _status: DomainViewModel<VerseStatus>

  isAlreadyAdded = computed(() =>
    this._status.$.value.inDeck !== Decks.None
  )
  verseId = computed(() =>
    this._verse._object.id
  )
  showStatus = computed(() =>
    this._status.$.value.inDeck !== Decks.None
  )
  status = computed(() =>
    this._status.$.value.inDeck.toUpperCase()
  )
  number = computed(() =>
    this._verse.$.value.number.toString()
  )
  translation = computed(() =>
    this._verse.$.value.translation.text
  )
  text = computed(() =>
    this._verse.$.value.text.lines
  )

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