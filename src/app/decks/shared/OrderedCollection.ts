import { Ref } from "vue"

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

export function removeItem(items: Ref<IndexedItem[]>): IndexedItem | undefined {
  const topItemIndex = items.value.findIndex(x => x.index === 0)
  if (topItemIndex !== -1) {
    items.value.forEach(x => x.index--)
    return items.value.splice(topItemIndex, 1)[0]
  }
}

export function appendItem(items: Ref<IndexedItem[]>, item: IndexedItem) {
  item.index = items.value.length
  items.value.push(item)
}