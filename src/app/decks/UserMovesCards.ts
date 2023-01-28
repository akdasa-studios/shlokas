import { CardViewModel } from "./shared/CardViewModel"
import { Vector3d } from "./shared/Vector3d"

export class DeckCardInteraction {
  constructor(
    private onCardSwiped: (card: CardViewModel, vector: Vector3d) => void
  ) {
  }

  updateCardInactiveState(card: CardViewModel) {
    card.position.x = 0
    card.position.y = card.index * 30
    card.position.z = -(card.index * 80)
    card.angle.x = 0
    card.angle.y = 0
    card.angle.z = 0
  }

  updateMovingCardState(card: CardViewModel, deltaPos: Vector3d) {
    card.position.x += deltaPos.x
    card.position.y += deltaPos.y
    card.angle.z = 15 * (card.position.x / 300)
    if (card.angle.z > 15) { card.angle.z = 15 }
    if (card.angle.z < -15) { card.angle.z = -15 }
  }

  updateMovedCardState(card: CardViewModel, vector: Vector3d) {
    if (vector.length < 30) { return }
    card.position.x *= 5
    card.position.y *= 5
    setTimeout(() => {
      this.onCardSwiped(card, vector)
    }, 250)
  }

}