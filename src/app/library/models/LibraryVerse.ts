import {
  Decks, Verse, VerseStatus
} from '@akdasa-studios/shlokas-core'
import { computed } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'

/**
 * Library verse view model
 */
export class LibraryVerse implements ViewModel {

  constructor(
    private readonly _verse: DomainViewModel<Verse>,
    private readonly _status: DomainViewModel<VerseStatus>
  ) { }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  get verseId()     { return this._v.id }
  get number()      { return this._v.number.toString() }
  get translation() { return this._v.translation.text }
  get text()        { return this._v.text.lines }
  get synonyms()    { return this._v.synonyms }

  statusId       = computed(() => this._s.id)
  isAlreadyAdded = computed(() => this._s.inDeck !== Decks.None)
  showStatus     = computed(() => this._s.inDeck !== Decks.None)
  status         = computed(() => this._s.inDeck.toLocaleLowerCase())

  // shortcuts:
  private get _v() { return this._verse.object }
  private get _s() { return this._status.ref.value }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() { await this._status.sync() }
}