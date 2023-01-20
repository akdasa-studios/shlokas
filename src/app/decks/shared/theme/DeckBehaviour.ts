import { CardViewModel , Vector3d } from '@/app/decks/shared'

export abstract class DeckBehaviour {
  public swipeThreshold = 40

  abstract updateInactiveCard(card: CardViewModel): void
  abstract updateMovingCard(card: CardViewModel, deltaPos: Vector3d): void
  abstract updateMovedCard(card: CardViewModel, deltaPos: Vector3d): void
}