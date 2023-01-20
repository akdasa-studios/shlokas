import { Verse } from '@akdasa-studios/shlokas-core'
import { reactive, ref } from 'vue'
import { Vector3d } from './Vector3d'

export enum CardState {
  Inactive, /* Card is inactive */
  Moving,   /* User moving a card */
  Removing  /* Card is removing from a deck */
}

export abstract class CardViewModel {
  constructor(
    private readonly verse: Verse
  ) {}

  index    = ref<number>(0)
  position = reactive(new Vector3d(0, 0, 0))
  angle    = reactive(new Vector3d(0, 0, 0))
  state    = ref<CardState>(CardState.Inactive)
  opacity  = ref(1)
  style    = ref("")

  abstract get id(): string
  get verseNumber() { return this.verse.number.toString() }
  get text()        { return this.verse.text.lines }
  get translation() { return this.verse.translation.text }
  get synonyms()    { return this.verse.synonyms }
}
