import { Verse } from '@akdasa-studios/shlokas-core'
import { ViewModel } from '@/app/DomainViewModel'
import { useAppearanceStore } from '@/app/settings'
import { hashString } from '../utils/hashString'

export abstract class CardViewModel implements ViewModel {
  private readonly _verse: Verse
  private readonly _appearance

  constructor(verse: Verse) {
    this._verse = verse
    this._appearance = useAppearanceStore()
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  get verseNumber() { return this._verse.number.toString() }
  get text()        { return this._verse.text.lines }
  get translation() { return this._verse.translation.text }
  get synonyms() {
    return this._verse.synonyms.map(x => ({
      word: x.word,
      translation: x.translation
    }))
  }

  get style() {
    if (this._appearance.colorfulCards) {
      return "side-color-" + (1+(hashString(this.verseNumber) % 8)).toString()
    } else {
      return "side-color-0"
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  sync(): void {
    // this._verse.sync()
  }
}
