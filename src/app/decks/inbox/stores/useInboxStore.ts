import { Application, InboxCard, VerseId } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { computed, markRaw, ref, Ref } from 'vue'
import { InboxCardViewModel } from '../models/InboxCardViewModel'
import { TutorialCardViewModel } from './../models/TutorialCardViewModel'

type InboxCards = InboxCardViewModel | TutorialCardViewModel


export function useInboxDeckStore(app: Application) {
  return defineStore('decks/inbox', () => {
    const cards: Ref<InboxCards[]> = ref([])
    const count = computed(() => cards.value.length)

    /* -------------------------------------------------------------------------- */
    /*                                   Actions                                  */
    /* -------------------------------------------------------------------------- */

    async function refresh() {
      const tutorialCmpleted = false
      const cardsToShow: InboxCards[] = []

      if (!tutorialCmpleted) {
        cardsToShow.push(markRaw(new TutorialCardViewModel("t01")))
        cardsToShow.push(markRaw(new TutorialCardViewModel("t02")))
      }

      (await getCards()).forEach(x => cardsToShow.push(x))
      cardsToShow.forEach((x, i) => x.index.value = i)
      console.log(cardsToShow.map(x => x.index.value))
      cards.value = cardsToShow
    }

    function shiftCard() {
      const topCard = cards.value.find(x => x.index.value === 0)
      if (topCard) {
        topCard.index.value = cards.value.length
        cards.value.forEach(x => x.index.value--)
      }
    }

    function removeCard(): InboxCardViewModel | undefined {
      const topCardIndex = cards.value.findIndex(x => x.index.value === 0)
      if (topCardIndex !== -1) {
        cards.value.forEach(x => x.index.value--)
        return cards.value.splice(topCardIndex, 1)[0] as InboxCardViewModel // TODO!!
      }
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

    return { cards, count, refresh, shiftCard, removeCard }
  })()
}
