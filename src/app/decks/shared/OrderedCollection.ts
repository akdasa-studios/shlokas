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