import { Application, InboxCard, VerseId } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { computed, markRaw, ref, Ref } from 'vue'
import { InboxCardViewModel } from '../models/InboxCardViewModel'

export function useInboxDeckStore(app: Application) {
  return defineStore('decks/inbox', () => {
    const cards: Ref<InboxCardViewModel[]> = ref([])
    const count = computed(() => cards.value.length)

    /* -------------------------------------------------------------------------- */
    /*                                   Actions                                  */
    /* -------------------------------------------------------------------------- */

    async function refresh() {
      cards.value = await getCards()
    }

    function shiftCard() {
      const card = cards.value.shift()
      if (card) { cards.value.push(card) }
    }

    function memorizeCard(): InboxCardViewModel | undefined {
      return cards.value.shift()
    }


    /* -------------------------------------------------------------------------- */
    /*                                   Private                                  */
    /* -------------------------------------------------------------------------- */

    async function getCards() : Promise<InboxCardViewModel[]> {
      const getVerse = async (verseId: VerseId) => {
        return (await app.library.getById(verseId)).value
      }

      const cards = await app.inboxDeck.cards()
      const viewModels = cards.map(async (card: InboxCard) =>
        markRaw(new InboxCardViewModel(card, await getVerse(card.verseId)))
      )

      return await Promise.all(viewModels)
    }


    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { cards, count, refresh, shiftCard, memorizeCard }
  })()
}
