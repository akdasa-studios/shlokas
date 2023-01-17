import { CardViewModel } from '@/app/decks/CardViewModel'
import { Vector3d } from '@/app/decks/Vector3d'

export abstract class DeckTheme {
  public swipeThreshold = 60

  abstract updateInactiveCard(card: CardViewModel): void
  abstract updateMovingCard(card: CardViewModel, deltaPos: Vector3d): void
  abstract updateMovedCard(card: CardViewModel, deltaPos: Vector3d): void
}