import { VerseCardViewModel , Vector3d } from '@/app/decks/shared'

export abstract class DeckBehaviour {
  public swipeThreshold = 40

  abstract updateInactiveCard(card: VerseCardViewModel): void
  abstract updateMovingCard(card: VerseCardViewModel, deltaPos: Vector3d): void
  abstract updateMovedCard(card: VerseCardViewModel, deltaPos: Vector3d): void
}