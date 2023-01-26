import { Application } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue'
import { appendItem, removeItem, shiftItem } from "@/app/decks/shared"
import { InboxCardViewModel } from "@/app/decks/inbox"


export function useInboxDeckStore(app: Application) {

  return defineStore('decks/inbox', () => {
    const cards: Ref<InboxCardViewModel[]> = ref([])
    const count = computed(() => cards.value.length)

    function clear() {
      cards.value = []
    }

    function addCard(card: InboxCardViewModel) {
      appendItem(cards, card)
    }
    function shiftCard() {
      shiftItem(cards)
    }

    function removeCard(): InboxCardViewModel | undefined {
      return removeItem(cards) as InboxCardViewModel | undefined
    }

    return { cards, count, shiftCard, removeCard, addCard, clear }
  })()
}
