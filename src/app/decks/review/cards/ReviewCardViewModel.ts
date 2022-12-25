import { CardId, ReviewCard, ReviewGrade, Scheduler, Verse } from '@akdasa-studios/shlokas-core'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'

export class ReviewCardViewModel implements ViewModel {
  private readonly _card: DomainViewModel<ReviewCard>
  private readonly _verse: DomainViewModel<Verse>

  public targetX = 0
  public targetY = 0

  constructor(
    card: ReviewCard,
    verse: Verse,
  ) {
    this._card = new DomainViewModel(card)
    this._verse = new DomainViewModel(verse)
  }

  sync(): void {
    this._card.sync()
    this._verse.sync()
  }

  get id(): CardId { return this._card.object.id }
  get type(): string { return this._card.object.type }
  get verseNumber(): string { return this._verse.object.number.toString() }
  get text() { return this._verse.object.text.lines }
  get translation(): string { return this._verse.object.translation.text }
  get interval(): number { return this._card.object.interval }
  get ease(): number { return this._card.object.ease }

  swipeAway() {
    this.targetX = -500
    setTimeout(() => { this.targetX = 0 }, 400)
  }

  get intervals(): number[] {
    const sc = new Scheduler()
    return [
      sc.getNewInterval(
        this._card.object.interval,
        this._card.object.ease / 100,
        ReviewGrade.Forgot
      ),
      sc.getNewInterval(
        this._card.object.interval,
        this._card.object.ease / 100,
        ReviewGrade.Hard
      ),
      sc.getNewInterval(
        this._card.object.interval,
        this._card.object.ease / 100,
        ReviewGrade.Good
      ),
      sc.getNewInterval(
        this._card.object.interval,
        this._card.object.ease / 100,
        ReviewGrade.Easy
      ),
    ]
  }
  review(grade: ReviewGrade) {
    // TODO: execure command
    this._card.object.review(grade)
  }
  get synonyms() : {word:string, translation:string}[] {
    return this._verse.object.synonyms.map(x => ({
      word: x.word,
      translation: x.translation
    }))
  }
}
