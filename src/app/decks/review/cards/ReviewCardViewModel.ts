import { ReviewCard, ReviewGrade, Scheduler, Verse } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'
import { CardViewModel } from '@/app/decks/CardViewModel'

export class ReviewCardViewModel extends CardViewModel implements ViewModel {
  private readonly _card: DomainViewModel<ReviewCard>

  constructor(
    card: ReviewCard,
    verse: Verse,
  ) {
    super(verse)
    this._card = new DomainViewModel(card)
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  targetX = ref(0)
  targetY = ref(0)
  id = computed(() =>  this._card.ref.value.id)
  type = computed(() =>  this._card.ref.value.type)
  interval = computed(() => this._card.ref.value.interval)
  ease = computed(() =>  this._card.ref.value.ease)
  nextIntervals = computed(() => {
    const sc = new Scheduler()
    return [
      ReviewGrade.Forgot, ReviewGrade.Hard,
      ReviewGrade.Good, ReviewGrade.Easy
    ].map(x =>
      sc.getNewInterval(
        this._card.ref.value.interval,
        this._card.ref.value.ease / 100, x
      )
    )
  })

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  review(grade: ReviewGrade) {
    // TODO: execure command
    this._card.object.review(grade)
  }

  swipeAway() {
    this.targetX.value = -500
    setTimeout(() => { this.targetX.value = 0 }, 400)
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  sync(): void {
    super.sync()
    this._card.sync()
  }

}
