import { Verse } from '@akdasa-studios/shlokas-core'
import { reactive, ref } from 'vue'
import { Vector3d } from './Vector3d'

export abstract class CardViewModel {
  private readonly _verse: Verse

  constructor(verse: Verse) {
    this._verse = verse
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  index    = ref<number>(0)
  position = reactive(new Vector3d(0, 0, 0))
  angle    = reactive(new Vector3d(0, 0, 0))
  action   = ref<string>("inactive")
  opacity  = ref(1)

  get verseNumber() { return this._verse.number.toString() }
  get text()        { return this._verse.text.lines }
  get translation() { return this._verse.translation.text }
  get synonyms()    { return this._verse.synonyms }
}
