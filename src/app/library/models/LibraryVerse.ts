import {
  Decks, Verse, VerseStatus
} from '@akdasa-studios/shlokas-core'
import { computed, Ref } from 'vue'
import { getContentUrl } from '@/app/Env'

/**
 * Library verse view model
 */
export class LibraryVerse {

  constructor(
    private readonly _verse: Verse,
    public readonly _status: Ref<VerseStatus>
  ) { }

  get verseId()     { return this._verse.id }
  get number()      { return this._verse.number.toString() }
  get translation() { return this._verse.translation.text }
  get text()        { return this._verse.text.lines }
  get synonyms()    { return this._verse.synonyms }
  get textAudioUri() { return this._verse.textAudioUri
                             ? getContentUrl(this._verse.textAudioUri)
                             : undefined }
  get textImageUri() { return this._verse.textImageUri
                             ? getContentUrl(this._verse.textImageUri)
                             : undefined }

  isAlreadyAdded = computed(() => this._status.value.inDeck !== Decks.None)
  showStatus     = computed(() => this._status.value.inDeck !== Decks.None)
  status         = computed(() => this._status.value.inDeck.toLocaleLowerCase())
}