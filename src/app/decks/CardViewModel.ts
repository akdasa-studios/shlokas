import { Verse } from '@akdasa-studios/shlokas-core'
import { computed } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'


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

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  sync(): void {
    this._verse.sync()
  }
}
