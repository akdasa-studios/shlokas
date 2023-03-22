import { CardState, CardViewModel } from '@/app/decks/shared/CardViewModel'
import { Vector3d } from '@/app/decks/shared'

export interface CardView {
  id: string
  index: number
  state: string
  style: string
  posX: number
  posY: number
  posZ: number
  angleX: number
  angleY: number
  angleZ: number
  opacity: number
}

export function useStackedDeck() {
  const maxAngleZ = 15
  const swipeThreshold = 40

  function updateInactiveCard(card: CardView) {
    card.state = 'inactive'
    card.posX = 0
    card.posY = card.index * 30
    card.posZ = -(card.index * 80)
    card.opacity = [1,1,.25,.25][card.index]
    card.angleX = 0
    card.angleY = 0
    card.angleZ = 0
    card.style = getStyle(card)
  }

  function updateMovingCard(card: CardView, deltaPos: [number, number]) {
    card.state = 'moving'
    card.posX = deltaPos[0]
    card.posY = deltaPos[1]
    card.angleZ = maxAngleZ * (card.posX / 300)
    if (card.angleZ > maxAngleZ)  { card.angleZ =  maxAngleZ }
    if (card.angleZ < -maxAngleZ) { card.angleZ = -maxAngleZ }
    card.style = getStyle(card)
  }

  function updateMovedCard(card: CardView, vector: Vector3d) {
    if (vector.length < swipeThreshold) {
      updateInactiveCard(card)
      return
    }
    card.state = 'removing'
    card.posX *= 5
    card.posY *= 5
    card.style = getStyle(card)
  }

  function getStyle(card: CardView) {
    const actions = {
      inactive: '.6s ease-in-out;',
      moving:   'none',
      removing: '.25s linear'
    }

    // @ts-ignore
    const transition = actions[card.state]

    return `transform: translatex(${card.posX}px)` +
           `           translatey(${card.posY}px)` +
           `           translatez(${card.posZ}px)` +
           `           rotateX(${card.angleX}deg)` +
           `           rotateY(${card.angleY}deg)` +
           `           rotateZ(${card.angleZ}deg);` +
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