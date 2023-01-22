import {
  Decks, Verse, VerseStatus, VerseStatusQueries
} from '@akdasa-studios/shlokas-core'
import { computed } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'

/**
 * Library verse view model
 */
export class LibraryVerse implements ViewModel {
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

  get verseId()     { return this._v.id }
  get number()      { return this._v.number.toString() }
  get translation() { return this._v.translation.text }
  get text()        { return this._v.text.lines }
  get synonyms()    { return this._v.synonyms }

  isAlreadyAdded = computed(() => this._s.inDeck !== Decks.None)
  statusId       = computed(() => this._s.id)
  showStatus     = computed(() => this._s.inDeck !== Decks.None)
  status         = computed(() => this._s.inDeck.toLocaleLowerCase() )

  // shortcuts:
  private get _v() { return this._verse.object }
  private get _s() { return this._status.ref.value }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() {
    await this._status.sync()
  }
}