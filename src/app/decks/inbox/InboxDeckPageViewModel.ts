import { InboxCard, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, markRaw, Ref, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { ApplicationViewModel } from '@/app/ApplicationViewModel'
import { CardMemorizedToastViewModel } from './CardMemorizedToastViewModel'
import { InboxCardViewModel } from './cards/InboxCardViewModel'


export class InboxDeckPageViewModel extends ViewModel {
  constructor(private readonly shlokas: ApplicationViewModel) {
    super()
  }

  public cards: Ref<InboxCardViewModel[]> = ref([])
  public count = computed(() => this.cards.value.length)
  public readonly cardMemorizedToast = new CardMemorizedToastViewModel()

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  public sync() {
    const getVerse = (verseId: VerseId) => {
      return this.shlokas.app.library.getById(verseId).value
    }
    this.cards.value = this.shlokas.app.inboxDeck.cards.map(
      (card: InboxCard) => markRaw(new InboxCardViewModel(card, getVerse(card.verseId)))
    )
  }
}