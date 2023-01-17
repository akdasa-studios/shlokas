import { ReviewCard, ReviewGrade, Scheduler, Verse } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { CardViewModel } from '@/app/decks/CardViewModel'

export class ReviewCardViewModel extends CardViewModel {
  private readonly _card: ReviewCard

  constructor(card: ReviewCard, verse: Verse) {
    super(verse)
    this._card = card
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  get card()     { return this._card }
  get id()       { return this._card.id }
  get dueTo()    { return this._card.dueTo }
  get type()     { return this._card.type }
  get interval() { return this._card.interval }
  get ease()     { return this._card.ease }

  targetX = ref(0)
  targetY = ref(0)

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
    this.targetX.value = -500
    setTimeout(() => { this.targetX.value = 0 }, 400)
  }
}
