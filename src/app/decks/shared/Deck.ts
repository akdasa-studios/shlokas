import { computed, ref, Ref } from "vue"
import { CardViewModel } from './CardViewModel'
type Maybe<T> = T | undefined


export class Deck<T extends CardViewModel> {
  public cards: Ref<T[]> = ref([])
  public count = computed(() => this.cards.value.filter(x => !x.isTutorialCard).length)

  hasCard(id: string) {
    return this.cards.value.findIndex(x => x.id === id) !== -1
  }

  addCard(card: CardViewModel) {
    appendItem(this.cards, card, card.isTutorialCard ? 0 : undefined)
  }

  shiftTopCard() {
    shiftItem(this.cards)
  }

  removeTopCard(): Maybe<CardViewModel> {
    return removeItem(this.cards) as Maybe<CardViewModel>
  }

  removeCardById(id: string): Maybe<CardViewModel> {
    const idx = this.cards.value.findIndex(x => x.id === id)
    if (idx !== -1) {
      return removeItem(this.cards, idx) as Maybe<CardViewModel>
    }
    return undefined
  }
}


interface IndexedItem {
  index: number
}

export function shiftItem(items: Ref<IndexedItem[]>) {
  const topItem = items.value.find(x => x.index === 0)
  if (topItem) {
    topItem.index = items.value.length
    items.value.forEach(x => x.index--)
  }
}

export function removeItem(items: Ref<IndexedItem[]>, index = 0): IndexedItem | undefined {
  const topItemIndex = items.value.findIndex(x => x.index === index)
  if (topItemIndex !== -1) {
    items.value.filter(x => x.index > index).forEach(x => x.index--)
    return items.value.splice(topItemIndex, 1)[0]
  } else {
    console.log("!!!")
  }
}

export function appendItem(items: Ref<IndexedItem[]>, item: IndexedItem, pos?: number) {
  if (pos !== undefined) {
    items.value
      .filter(x => x.index >= pos)
      .forEach(x => x.index += 1)
  }
  item.index = pos === undefined ? items.value.length : pos
  items.value.push(item)
  // @ts-ignore
  // console.log(items.value.map(x => ({x:x.index, t:x.type})))
}