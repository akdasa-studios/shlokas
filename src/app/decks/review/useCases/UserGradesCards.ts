import { Application, ReviewCard, ReviewCardReviewed, ReviewGrade } from "@akdasa-studios/shlokas-core"
import { ReviewCardViewModel, useReviewDeckStore } from "@/app/decks/review"
import { useLibraryStore } from "@/app/library"

export class UserGradesCardsUseCase {
  private readonly _app: Application
  private readonly _reviewDeckStore
  private readonly _libraryStore

  constructor(app: Application) {
    this._app = app
    this._reviewDeckStore = useReviewDeckStore()
    this._libraryStore = useLibraryStore(this._app)
  }

  async open() {
    const cards  = await this._app.reviewDeck.dueToCards(this._app.timeMachine.now)
    const sorted = Array.from(cards).sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime())

    // TODO: should be sorting by date be extracted to shlokas-core?
    const viewModels = sorted.map(async (card: ReviewCard) => {
      return new ReviewCardViewModel(card, await this._libraryStore.getVerse(card.verseId))
    })

    this._reviewDeckStore.clear()
    const cvm = await Promise.all(viewModels)
    cvm.forEach(x => this._reviewDeckStore.addCard(x))
  }

  async gradeTopCard(grade: ReviewGrade) {
    const topCard = this._reviewDeckStore.cards[0]
    await this._app.processor.execute(new ReviewCardReviewed(topCard.card as ReviewCard, grade))

    if (topCard.card.dueTo.getTime() !== this._app.timeMachine.today.getTime()) {
      this._reviewDeckStore.removeCard()
    } else {
      this._reviewDeckStore.shiftCard()
    }
  }

  get count() { return this._reviewDeckStore.count }
  get cards() { return this._reviewDeckStore.cards }
  get topCard() { return this._reviewDeckStore.cards[0] }
}