import { CardViewModel } from '@/app/decks/CardViewModel'
import { Vector3d } from '@/app/decks/Vector3d'

export abstract class DeckBehaviour {
  public swipeThreshold = 40

  abstract updateInactiveCard(card: CardViewModel): void
  abstract updateMovingCard(card: CardViewModel, deltaPos: Vector3d): void
  abstract updateMovedCard(card: CardViewModel, deltaPos: Vector3d): void
}