import { CardState, CardViewModel } from '@/app/decks/shared/CardViewModel'
import { Vector3d } from '@/app/decks/shared'

export function useStackedDeck() {
  const maxAngleZ = 15
  const swipeThreshold = 40

  function updateInactiveCard(card: CardViewModel) {
    card.state = CardState.Inactive
    card.position.x = 0
    card.position.y = card.index * 30
    card.position.z = -(card.index * 80)
    card.opacity = [1,1,.25,.25][card.index]
    card.angle.x = 0
    card.angle.y = 0
    card.angle.z = 0
    card.style = getStyle(card)
  }

  function updateMovingCard(card: CardViewModel, deltaPos: Vector3d) {
    card.state = CardState.Moving
    card.position.x += deltaPos.x
    card.position.y += deltaPos.y
    card.angle.z = maxAngleZ * (card.position.x / 300)
    if (card.angle.z > maxAngleZ)  { card.angle.z =  maxAngleZ }
    if (card.angle.z < -maxAngleZ) { card.angle.z = -maxAngleZ }
    card.style = getStyle(card)
  }

  function updateMovedCard(card: CardViewModel, vector: Vector3d) {
    if (vector.length < swipeThreshold) {
      updateInactiveCard(card)
      return
    }
    card.state = CardState.Removing
    card.position.x *= 5
    card.position.y *= 5
    card.style = getStyle(card)
  }

  function getStyle(card: CardViewModel) {
    const actions = {
      [CardState.Inactive]: '.6s ease-in-out;',
      [CardState.Moving]:   'none',
      [CardState.Removing]: '.25s linear'
    }

    const transition = actions[card.state]

    return `transform: translateX(${card.position.x}px)` +
           `           translateY(${card.position.y}px)` +
           `           translateZ(${card.position.z}px)` +
           `           rotateX(${card.angle.x}deg)` +
           `           rotateY(${card.angle.y}deg)` +
           `           rotateZ(${card.angle.z}deg);` +
           `transition: ${transition};`+
           `opacity: ${card.opacity};`+
           `z-index: ${10 - card.index}`
  }

  return {
    updateInactiveCard,
    updateMovingCard,
    updateMovedCard,
    swipeThreshold
  }
}