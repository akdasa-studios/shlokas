import { Application, InboxCardMemorized, ReviewCard, ReviewCardReviewed, ReviewGrade } from "@akdasa-studios/shlokas-core"
import { Emitter } from 'mitt'
import { ReviewVerseCardViewModel, useReviewDeckStore } from "@/app/decks/review"
import { Events } from '@/app/Events'
import { useLibraryStore } from "@/app/library"

export class ReviewDeckCardsController {
  private readonly _app: Application
  private readonly _reviewDeckStore
  private readonly _libraryStore

  constructor(app: Application, emitter: Emitter<Events>) {
    this._app = app
    this._reviewDeckStore = useReviewDeckStore()
    this._libraryStore    = useLibraryStore(this._app)


    emitter.on('commandExecuted', async (e) => {
      if (e instanceof InboxCardMemorized) { await this.addCardsToDeck()}
    })
    emitter.on('syncCompleted', async () => await this.addCardsToDeck())
    emitter.on('appOpened', async () => await this.addCardsToDeck())
  }

  async addCardsToDeck() {
    const cards  = await this._app.reviewDeck.dueToCards(this._app.timeMachine.now)
    const sorted = Array.from(cards).sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime())

    for (const card of sorted) {
      const isAlreadyInDeck = this._reviewDeckStore.hasCard(card.id.value)
      if (!isAlreadyInDeck) {
          const verse   = await this._libraryStore.getVerse(card.verseId)
          const newCard = new ReviewVerseCardViewModel(card, verse)
          this._reviewDeckStore.addCard(newCard)
      }
    }

    const cardsToDelete = []
    for (const vm of this._reviewDeckStore.cards) {
      const index = cards.findIndex(x => x.id.value === vm.id)
      if (index === -1 && vm.type !== "tutorial") { cardsToDelete.push(vm.id) }
    }
    cardsToDelete.forEach(x => this._reviewDeckStore.removeCardById(x))
  }

  async gradeTopCard(grade: ReviewGrade) {
    const topCard = this.topCard
    await this._app.processor.execute(new ReviewCardReviewed(topCard.card as ReviewCard, grade))

    if (topCard.card.dueTo.getTime() !== this._app.timeMachine.today.getTime()) {
      this._reviewDeckStore.removeTopCard()
    } else {
      this._reviewDeckStore.shiftTopCard()
    }
  }

  get count() { return this._reviewDeckStore.count }
  get cards() { return this._reviewDeckStore.cards }
  get topCard(): ReviewVerseCardViewModel { return this._reviewDeckStore.cards[0] as ReviewVerseCardViewModel }
}