import { InboxCard, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { shlokas } from '@/application'
import { CardMemorizedToastViewModel } from './CardMemorizedToastViewModel'
import { InboxCardViewModel } from './cards/InboxCardViewModel'


export class InboxDeckPageViewModel implements ViewModel {

  public cards = ref<InboxCardViewModel[]>([])
  public count = computed(() => this.cards.value.length)
  public readonly cardMemorizedToast = new CardMemorizedToastViewModel()

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  public sync() {
    const getVerse = (verseId: VerseId) => {
      return shlokas.app.library.getById(verseId).value
    }
    this.cards.value = shlokas.app.inboxDeck.cards.map(
      (card: InboxCard) => new InboxCardViewModel(card, getVerse(card.verseId))
    )
  }
}