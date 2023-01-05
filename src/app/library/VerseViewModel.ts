import { Decks, Text, Translation, Verse, VerseBuilder, VerseNumber, VerseStatus, VerseStatusId, VerseStatusQueries } from '@akdasa-studios/shlokas-core'
import { computed } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'

export class VerseViewModel implements ViewModel {
  private readonly _verse: DomainViewModel<Verse>
  private readonly _status: DomainViewModel<VerseStatus>

  constructor(
    verse: Verse,
    verseStatus: VerseStatus
  ) {
    this._verse = new DomainViewModel<Verse>(verse)

    // add query as the second parameter, because object
    // may not exist, and be created later
    this._status = new DomainViewModel<VerseStatus>(
      verseStatus,
      VerseStatusQueries.verseId(verse.id)
    )
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  verseId = computed(() => this._verse.object.id)
  number = computed(() => this._verse.ref.value.number.toString())
  translation = computed(() => this._verse.ref.value.translation.text)
  text = computed(() => this._verse.ref.value.text.lines)

  isAlreadyAdded = computed(() => this._status.ref.value.inDeck !== Decks.None)
  statusId = computed(() => this._status.object.id)
  showStatus = computed(() => this._status.ref.value.inDeck !== Decks.None)
  status = computed(() => this._status.ref.value.inDeck.toUpperCase())

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() {
    // await this._verse.sync()
    await this._status.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

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