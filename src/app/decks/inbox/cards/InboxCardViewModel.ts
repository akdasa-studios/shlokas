import { InboxCard, InboxCardMemorized, Verse } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'
import { shlokas } from '@/application'
import { CardViewModel } from '@/app/decks/CardViewModel'


export class InboxCardViewModel extends CardViewModel implements ViewModel {
  public readonly _card: DomainViewModel<InboxCard>

  constructor(card: InboxCard, verse: Verse) {
    super(verse)
    this._card = new DomainViewModel(card)
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  id = computed(() =>  this._card.ref.value.id)
  type = computed(() => this._card.ref.value.type)
  grade = ref<string>("")

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  setGrade(value:string) {
    this.grade.value=value
  }

  memorized() {
    shlokas.execute(new InboxCardMemorized(this._card.object))
    shlokas.inboxDeck.sync()
    shlokas.reviewDeck.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  sync(): void {
    super.sync()
    this._card.sync()
  }
}
