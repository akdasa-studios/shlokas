import { AddVerseToInboxDeck, Application } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'

import { InboxVerseCardViewModel, useInboxDeckStore } from '@/app/decks/inbox'


export function runSyncInboxDeckTask(app: Application, emitter: EventEmitter2) {
  const inboxDeckStore = useInboxDeckStore()

  // Subscribe
  emitter.on('commandExecuted', async (e) => {
    if (e instanceof AddVerseToInboxDeck) { await sync() }
  })
  emitter.on('syncCompleted', async () => { await sync() })
  emitter.on('appStateChanged', async () => { await sync() })

  async function sync() {
    const cards = await app.inboxDeck.cards()

    for (const card of cards) {
      const isAlreadyInDeck = inboxDeckStore.hasCard(card.id.value)
      if (!isAlreadyInDeck) {
          const verse   = await app.library.getById(card.verseId)
          const newCard = new InboxVerseCardViewModel(card, verse)
          inboxDeckStore.addCard(newCard)
      }
    }

    const cardsToDelete = []
    for (const vm of inboxDeckStore.cards) {
      const index = cards.findIndex(x => x.id.value === vm.id)
      if (index === -1 && vm.type !== 'tutorial') { cardsToDelete.push(vm.id) }
    }
    cardsToDelete.forEach(x => inboxDeckStore.removeCardById(x))
  }
}
