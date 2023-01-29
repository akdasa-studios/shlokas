import { ReviewCard, ReviewGrade, Scheduler, Verse } from '@akdasa-studios/shlokas-core'
import { computed, unref } from 'vue'
import { VerseCardViewModel } from '@/app/decks/shared'

export class ReviewVerseCardViewModel extends VerseCardViewModel {
  private readonly _card: ReviewCard

  constructor(card: ReviewCard, verse: Verse) {
    super(verse)
    this._card = card
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  get card(): ReviewCard { return unref(this._card) as ReviewCard }
  get id()       { return this._card.id.value }
  get dueTo()    { return this._card.dueTo }
  get type()     { return this._card.type }
  get interval() { return this._card.interval }
  get ease()     { return this._card.ease }

  grade: ReviewGrade|undefined = undefined

  nextIntervals = computed(() => {
    const sc = new Scheduler()
    return [
      ReviewGrade.Forgot, ReviewGrade.Hard,
      ReviewGrade.Good, ReviewGrade.Easy
    ].map(x =>
      sc.getNewInterval(
        this._card.interval,
        this._card.ease / 100, x
      )
    )
  })

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  review(grade: ReviewGrade) {
    // TODO: execure command
    this._card.review(grade)
  }

  swipeAway() {
    this.position.x = -500
    setTimeout(() => { this.position.x = 0 }, 400)
  }
}
