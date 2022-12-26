import { Verse } from '@akdasa-studios/shlokas-core'
import { computed, ComputedRef } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'



export class CardViewModel implements ViewModel {
  public readonly _verse: DomainViewModel<Verse>

  constructor(
    verse: Verse
  ) {
    this._verse = new DomainViewModel(verse)
  }

  sync(): void {
    this._verse.sync()
  }

  verseNumber: ComputedRef<string> = computed(() => this._verse.ref.value.number.toString())
  text = computed(() => this._verse.ref.value.text.lines)
  translation = computed(() => this._verse.ref.value.translation.text)
  synonyms = computed(() => {
    return this._verse.ref.value.synonyms.map(x => ({
      word: x.word,
      translation: x.translation
    }))
  })
}
