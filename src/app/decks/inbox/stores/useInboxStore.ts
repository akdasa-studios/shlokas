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
      const topCard = cards.value.find(x => x.index.value === 0)
      if (topCard) {
        cards.value.forEach(function(x) { x.index.value-- })
        topCard.index.value = cards.value.length - 1
      }
      // if (topCard) { cards.value.push(topCard) }
    }

    function memorizeCard(): InboxCardViewModel | undefined {
      const topCard = cards.value.shift()
      return topCard
    }


    /* -------------------------------------------------------------------------- */
    /*                                   Private                                  */
    /* -------------------------------------------------------------------------- */

    async function getCards() : Promise<InboxCardViewModel[]> {
      const getVerse = async (verseId: VerseId) => {
        return (await app.library.getById(verseId)).value
      }

      const cards = await app.inboxDeck.cards()
      const viewModels = cards.map(async (card: InboxCard, idx: number) =>
        markRaw(new InboxCardViewModel(card, await getVerse(card.verseId), idx))
      )

      return await Promise.all(viewModels)
    }


    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { cards, count, refresh, shiftCard, memorizeCard }
  })()
}
