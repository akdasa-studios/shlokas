import { InboxCard, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { root } from '@/application'
import { InboxCardViewModel } from './cards/InboxCardViewModel'


export class InboxPageViewModel implements ViewModel {

  /* ---------------------------------- Cards --------------------------------- */
  public cards = ref<InboxCardViewModel[]>([])
  public count = computed(() => this.cards.value.length)

  public revertLastAction() {
    root.app.processor.revert()
    root.inbox.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                            Card memorized toast                            */
  /* -------------------------------------------------------------------------- */

  public isCardMemorizedToastOpen = ref<boolean>(false)
  public openCardMemorizesToast() {
    this.isCardMemorizedToastOpen.value = true
  }
  public closeCardMemorizedToast() {
    this.isCardMemorizedToastOpen.value = false
  }


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
      (card: InboxCard) => new InboxCardViewModel(card, getVerse(card.verseId))
    )
  }
}