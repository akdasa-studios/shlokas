import { AddVerseToInboxDeck, Application, InboxCardMemorized, UpdateVerseStatus } from '@akdasa-studios/shlokas-core'
import { Emitter } from 'mitt'
import { useToast } from '@/app/composables'
import { InboxVerseCardViewModel, useInboxDeckStore } from '@/app/decks/inbox'
import { Events } from '@/app/Events'
import { useLibraryStore } from '@/app/library'


export class InboxDeckCardsController {
  private readonly _app: Application
  private readonly _inboxDeckStore
  private readonly _libraryStore
  private readonly _cardMemorizedToast

  constructor(app: Application, emitter: Emitter<Events>) {
    this._app = app
    this._inboxDeckStore = useInboxDeckStore()
    this._libraryStore = useLibraryStore(this._app)
    this._cardMemorizedToast = useToast()

    emitter.on('commandExecuted', async (e) => {
      if (e instanceof AddVerseToInboxDeck) { await this.addCardsToDeck() }
    })
    emitter.on('syncCompleted', async () => { await this.addCardsToDeck() })
    emitter.on('appStateChanged', async () => { await this.addCardsToDeck() })
  }

  /**
   * Adds all cards from the inbox deck to the inbox deck.
   */
  async addCardsToDeck() {
    const cards = await this._app.inboxDeck.cards()
    console.log('addCardsToDeck', JSON.stringify(cards))

    for (const card of cards) {
      const isAlreadyInDeck = this._inboxDeckStore.hasCard(card.id.value)
      if (!isAlreadyInDeck) {
          const verse   = await this._libraryStore.getVerse(card.verseId)
          const newCard = new InboxVerseCardViewModel(card, verse)
          this._inboxDeckStore.addCard(newCard)
      }
    }

    const cardsToDelete = []
    for (const vm of this._inboxDeckStore.cards) {
      const index = cards.findIndex(x => x.id.value === vm.id)
      if (index === -1 && vm.type !== 'tutorial') { cardsToDelete.push(vm.id) }
    }
    cardsToDelete.forEach(x => this._inboxDeckStore.removeCardById(x))
  }

  /**
   * Shifts the top card to the bottom of the deck.
   */
  async shiftTopCard() {
    this._inboxDeckStore.shiftTopCard()
  }

  /**
   * Removes the top card from the deck and marks it as memorized.
   */
  async memorizeTopCard() {
    const cardViewModel = this._inboxDeckStore.removeTopCard() as InboxVerseCardViewModel
    if (cardViewModel) {
      const inboxCard = cardViewModel.card
      await this._app.processor.execute(new InboxCardMemorized(inboxCard))
      await this._app.processor.execute(new UpdateVerseStatus(inboxCard.verseId))
      this._cardMemorizedToast.open()
    }
  }

  /**
   * Reverts the last action.
   */
  async revert() {
    await this._app.processor.revert()
  }

  get cards() { return this._inboxDeckStore.cards }
  get cardMemorizedToast() { return this._cardMemorizedToast }
  get topCard() { return this._inboxDeckStore.cards[0] }
}