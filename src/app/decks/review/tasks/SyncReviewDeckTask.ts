import { Application, InboxCardMemorized } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'
import { ReviewVerseCardViewModel, useReviewDeckStore } from '@/app/decks/review'


export function runSyncReviewDeckTask(app: Application, emitter: EventEmitter2) {
  const _reviewDeckStore = useReviewDeckStore()

  emitter.on('commandExecuted', async (e) => {
    if (e instanceof InboxCardMemorized) { await addCardsToDeck()}
  })
  emitter.on('syncCompleted', async () => await addCardsToDeck())
  emitter.on('appStateChanged', async () => await addCardsToDeck())

  async function addCardsToDeck() {
    const cards  = await app.reviewDeck.dueToCards(app.timeMachine.now)
    const sorted = Array.from(cards).sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime())

    for (const card of sorted) {
      const isAlreadyInDeck = _reviewDeckStore.hasCard(card.id.value)
      if (!isAlreadyInDeck) {
          const verse   = await app.library.getById(card.verseId)
          const newCard = new ReviewVerseCardViewModel(card, verse)
          _reviewDeckStore.addCard(newCard)
      }
    }

    const cardsToDelete = []
    for (const vm of _reviewDeckStore.cards) {
      const index = cards.findIndex(x => x.id.value === vm.id)
      if (index === -1 && vm.type !== 'tutorial') { cardsToDelete.push(vm.id) }
    }
    cardsToDelete.forEach(x => _reviewDeckStore.removeCardById(x))
  }
}