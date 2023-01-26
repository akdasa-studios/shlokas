import { Application } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue'
import { appendItem, removeItem, shiftItem } from "@/app/decks/shared"
import { InboxCardViewModel } from "@/app/decks/inbox"


export function useInboxDeckStore(app: Application) {
  // const libraryStore = useLibraryStore(app)

  return defineStore('decks/inbox', () => {
    const cards: Ref<InboxCardViewModel[]> = ref([])
    const count = computed(() => cards.value.length)

    /* -------------------------------------------------------------------------- */
    /*                                   Actions                                  */
    /* -------------------------------------------------------------------------- */

    // async function refresh() {
    //   // const tutorialCmpleted = false
    //   // const cardsToShow: InboxCardViewModel[] = []

    //   // if (!tutorialCmpleted) {
    //   //   cardsToShow.push(markRaw(new TutorialCardViewModel("t01")))
    //   //   cardsToShow.push(markRaw(new TutorialCardViewModel("t02")))
    //   // }

    //   (await getCards()).forEach(x => cardsToShow.push(x))
    //   cardsToShow.forEach((x, i) => x.index.value = i)
    //   console.log(cardsToShow.map(x => x.index.value))
    //   cards.value = cardsToShow
    // }

    function addCard(card: InboxCardViewModel) {
      appendItem(cards, card)
    }
    function shiftCard() {
      shiftItem(cards)
    }

    function removeCard(): InboxCardViewModel | undefined {
      return removeItem(cards) as InboxCardViewModel | undefined
    }

    // /* -------------------------------------------------------------------------- */
    // /*                                   Private                                  */
    // /* -------------------------------------------------------------------------- */

    // async function getCards() : Promise<InboxVerseCardViewModel[]> {
    //   const cards = await app.inboxDeck.cards()
    //   const viewModels = cards.map(async (card: InboxCard) =>
    //     markRaw(new InboxVerseCardViewModel(card, await libraryStore.getVerse(card.verseId)))
    //   )

    //   return await Promise.all(viewModels)
    // }

    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { cards, count, shiftCard, removeCard, addCard }
  })()
}
