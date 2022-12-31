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

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public cards: Ref<InboxCardViewModel[]> = ref([])
  public count = computed(() => this.cards.value.length)
  public readonly cardMemorizedToast = new CardMemorizedToastViewModel()

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() : Promise<void> {
    const getVerse = async (verseId: VerseId) => {
      return (await this.shlokas.app.library.getById(verseId)).value
    }
    const cards = await this.shlokas.app.inboxDeck.cards()
    this.cards.value = await Promise.all(
      cards.map(async(card: InboxCard) =>
        markRaw(new InboxCardViewModel(card, await getVerse(card.verseId)))
      )
    )
  }
}