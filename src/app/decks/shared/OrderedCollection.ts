import { markRaw, Ref } from "vue"

interface IndexedItem {
  index: Ref<number>
}

export function shiftItem(items: Ref<IndexedItem[]>) {
  const topItem = items.value.find(x => x.index.value === 0)
  if (topItem) {
    topItem.index.value = items.value.length
    items.value.forEach(x => x.index.value--)
  }
}

export function removeItem(items: Ref<IndexedItem[]>): IndexedItem | undefined {
  const topItemIndex = items.value.findIndex(x => x.index.value === 0)
  if (topItemIndex !== -1) {
    items.value.forEach(x => x.index.value--)
    return items.value.splice(topItemIndex, 1)[0]
  }
}

export function appendItem(items: Ref<IndexedItem[]>, item: IndexedItem) {
  item.index.value = items.value.length
  items.value.push(markRaw(item))
}