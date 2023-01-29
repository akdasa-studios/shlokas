import { Vector3d } from './Vector3d'

export enum CardState {
  Inactive, /* Card is inactive */
  Moving,   /* User moving a card */
  Removing  /* Card is removing from a deck */
}

export abstract class CardViewModel {
  index    = 0
  flipped  = false
  position = new Vector3d(0, 0, 0)
  angle    = new Vector3d(0, 0, 0)
  state    = CardState.Inactive
  opacity  = 1
  style    = ""

  abstract get id(): string
  abstract get type(): string
  flip() { this.flipped = !this.flipped }
  showFrontSide() { this.flipped = false }

  get isTutorialCard(): boolean {
    return this.type === "tutorial"
  }
}
