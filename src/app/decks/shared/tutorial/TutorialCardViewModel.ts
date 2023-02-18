import { CardViewModel } from '@/app/decks/shared'


export class TutorialCardViewModel extends CardViewModel {
  constructor(
    private readonly _id: string,
  ) {
    super()
  }

  get id() { return this._id }
  get type() { return 'tutorial' }
}
