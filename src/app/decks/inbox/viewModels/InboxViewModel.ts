import { ViewModel } from '@/app/DomainViewModel'
import { root } from '@/application'
import { InboxCard, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { InboxCardVewModel } from './InboxCardVewModel'


export class InboxViewModel implements ViewModel {

  /* ---------------------------------- Cards --------------------------------- */
  public cards = ref<InboxCardVewModel[]>([])
  public count = computed(() => this.cards.value.length)

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  public sync() {
    const getVerse = (verseId: VerseId) => {
      const result = root.app.library.getById(verseId)
      return result.value
    }
    const inboxCards = root.app.inboxDeck.cards

    this.cards.value = inboxCards.map(
      (card: InboxCard) => new InboxCardVewModel(card, getVerse(card.verseId))
    )
  }
}