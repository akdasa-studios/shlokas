import { CardViewModel } from "@/app/decks/CardViewModel"
import { Vector3d } from "@/app/decks/Vector3d"
import { DeckBehaviour } from "@/app/decks/shared"

export class DefaultDeckBehaviour extends DeckBehaviour {
  private readonly maxAngleZ = 15

  updateInactiveCard(card: CardViewModel) {
    card.position.x = 0
    card.position.y = 0
    card.position.z = -(card.index.value * 80)
    card.angle.x = 0
    card.angle.y = 0
    card.angle.z = 0
  }

  updateMovingCard(card: CardViewModel, deltaPos: Vector3d) {
    card.position.x += deltaPos.x
    card.position.y += deltaPos.y
    card.angle.z = this.maxAngleZ * (card.position.x / 300)
    if (card.angle.z > this.maxAngleZ)  { card.angle.z =  this.maxAngleZ }
    if (card.angle.z < -this.maxAngleZ) { card.angle.z = -this.maxAngleZ }
  }

  updateMovedCard(card: CardViewModel, vector: Vector3d) {
    if (vector.length < this.swipeThreshold) { return }
    card.position.x *= 5
    card.position.y *= 5
  }
}