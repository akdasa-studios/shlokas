import { ReviewCard, ReviewGrade, Scheduler, Verse } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'
import { CardViewModel } from '../../inbox'

export class ReviewCardViewModel extends CardViewModel implements ViewModel {
  private readonly _card: DomainViewModel<ReviewCard>

  public targetX = ref(0)
  public targetY = ref(0)

  constructor(
    card: ReviewCard,
    verse: Verse,
  ) {
    super(verse)
    this._card = new DomainViewModel(card)
  }

  sync(): void {
    super.sync()
    this._card.sync()
  }

  id = computed(() =>  this._card.ref.value.id)
  type = computed(() =>  this._card.ref.value.type)
  interval = computed(() => this._card.ref.value.interval)
  ease = computed(() =>  this._card.ref.value.ease)

  swipeAway() {
    this.targetX.value = -500
    setTimeout(() => { this.targetX.value = 0 }, 400)
  }

  intervals = computed(() => {
    const sc = new Scheduler()
    return [
      sc.getNewInterval(
        this._card.ref.value.interval,
        this._card.ref.value.ease / 100,
        ReviewGrade.Forgot
      ),
      sc.getNewInterval(
        this._card.ref.value.interval,
        this._card.ref.value.ease / 100,
        ReviewGrade.Hard
      ),
      sc.getNewInterval(
        this._card.ref.value.interval,
        this._card.ref.value.ease / 100,
        ReviewGrade.Good
      ),
      sc.getNewInterval(
        this._card.ref.value.interval,
        this._card.ref.value.ease / 100,
        ReviewGrade.Easy
      ),
    ]
  })

  review(grade: ReviewGrade) {
    // TODO: execure command
    this._card.object.review(grade)
  }
}
