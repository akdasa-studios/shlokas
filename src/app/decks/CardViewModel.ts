import { Verse } from '@akdasa-studios/shlokas-core'
import { computed } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'
import { hashString } from '../utils/hashString'

export abstract class CardViewModel implements ViewModel {
  public readonly _verse: DomainViewModel<Verse>

  constructor(verse: Verse) {
    this._verse = new DomainViewModel(verse)
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  verseNumber = computed(() => this._verse.ref.value.number.toString())
  text = computed(() => this._verse.ref.value.text.lines)
  translation = computed(() => this._verse.ref.value.translation.text)
  synonyms = computed(() => {
    return this._verse.ref.value.synonyms.map(x => ({
      word: x.word,
      translation: x.translation
    }))
  })

  style = computed(() => {
    // if (shlokas.settings.colorfulCards.value) {
    //   return "side-color-" + (1+(hashString(this.verseNumber.value) % 8)).toString()
    // } else {
      return "side-color-0"
    // }
  })
  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  sync(): void {
    this._verse.sync()
  }
}
