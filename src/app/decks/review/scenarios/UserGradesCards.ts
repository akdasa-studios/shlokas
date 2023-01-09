import { Application, ReviewGrade } from "@akdasa-studios/shlokas-core"
import { useReviewDeckStore } from "@/app/decks/review"

export class UserGradesCards {
  private readonly _app: Application
  private readonly _reviewDeckStore

  constructor(app: Application) {
    this._app = app
    this._reviewDeckStore = useReviewDeckStore(this._app)
  }

  open() {
    this._reviewDeckStore.refresh()
  }

  async gradeCard(grade: ReviewGrade) {
    this._reviewDeckStore.reviewTopCard(grade)
  }


  get count() { return this._reviewDeckStore.count }
  get cards() { return this._reviewDeckStore.cards }

}