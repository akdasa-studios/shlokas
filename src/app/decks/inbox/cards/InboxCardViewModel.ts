import { InboxCard, InboxCardMemorized, Verse } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'
// import { shlokas } from '@/application'
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

  // id = computed(() =>  this._card.ref.value.id)
  get id() { return this._card.object.id }
  type = computed(() => this._card.ref.value.type)
  addedAt = computed(() => this._card.ref.value.addedAt)
  grade = ref("")

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async memorized() {
    // await shlokas.execute(new InboxCardMemorized(this._card.object))
    // await shlokas.inboxDeck.sync()
    // await shlokas.reviewDeck.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() {
    super.sync()
    await this._card.sync()
  }
}
