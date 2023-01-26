import { reactive, ref } from 'vue'
import { Vector3d } from './Vector3d'

export enum CardState {
  Inactive, /* Card is inactive */
  Moving,   /* User moving a card */
  Removing  /* Card is removing from a deck */
}

export abstract class CardViewModel {
  index    = ref<number>(0)
  flipped  = ref<boolean>(false)
  position = reactive(new Vector3d(0, 0, 0))
  angle    = reactive(new Vector3d(0, 0, 0))
  state    = ref<CardState>(CardState.Inactive)
  opacity  = ref(1)
  style    = ref("")

  abstract get id(): string
  abstract get type(): string
  flip() { this.flipped.value = !this.flipped.value }
  showFrontSide() { this.flipped.value = false }
}
