import {
  Decks, Verse, VerseStatus
} from '@akdasa-studios/shlokas-core'
import { computed, Ref } from 'vue'

/**
 * Library verse view model
 */
export class LibraryVerse {

  constructor(
    private readonly _verse: Verse,
    private readonly _status: Ref<VerseStatus>
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
  private get _v() { return this._verse }
  private get _s() { return this._status.value }
}