import { CardState, CardViewModel } from "@/app/decks/shared/CardViewModel"
import { Vector3d, DeckBehaviour } from "@/app/decks/shared"

export class StackedDeckBehaviour extends DeckBehaviour {
  private readonly maxAngleZ = 15

  updateInactiveCard(card: CardViewModel) {
    card.state.value = CardState.Inactive
    card.position.x = 0
    card.position.y = card.index.value * 30
    card.position.z = -(card.index.value * 80)
    card.opacity.value = [1,1,.25,.25][card.index.value]
    card.angle.x = 0
    card.angle.y = 0
    card.angle.z = 0
    card.style.value = this.getStyle(card)
  }

  updateMovingCard(card: CardViewModel, deltaPos: Vector3d) {
    card.state.value = CardState.Moving
    card.position.x += deltaPos.x
    card.position.y += deltaPos.y
    card.angle.z = this.maxAngleZ * (card.position.x / 300)
    if (card.angle.z > this.maxAngleZ)  { card.angle.z =  this.maxAngleZ }
    if (card.angle.z < -this.maxAngleZ) { card.angle.z = -this.maxAngleZ }
    card.style.value = this.getStyle(card)
  }

  updateMovedCard(card: CardViewModel, vector: Vector3d) {
    if (vector.length < this.swipeThreshold) {
      this.updateInactiveCard(card)
      return
    }
    card.state.value = CardState.Removing
    card.position.x *= 5
    card.position.y *= 5
    card.style.value = this.getStyle(card)
  }

  private getStyle(card: CardViewModel) {
    const actions = {
      [CardState.Inactive]: '.6s ease-in-out;',
      [CardState.Moving]:   'none',
      [CardState.Removing]: '.25s linear'
    }

    const transition = actions[card.state.value]

    return `transform: translateX(${card.position.x}px)` +
           `           translateY(${card.position.y}px)` +
           `           translateZ(${card.position.z}px)` +
           `           rotateX(${card.angle.x}deg)` +
           `           rotateY(${card.angle.y}deg)` +
           `           rotateZ(${card.angle.z}deg);` +
           `transition: ${transition};`+
           `opacity: ${card.opacity.value};`+
           `z-index: ${10 - card.index.value}`
  }
}