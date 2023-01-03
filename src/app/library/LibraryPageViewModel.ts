import { Language } from '@akdasa-studios/shlokas-core'
import { OverlayEventDetail } from '@ionic/core/components'
import { markRaw, Ref, ref, watch } from 'vue'
import { VerseViewModel } from '@/app/library'
import { ViewModel } from '@/app/DomainViewModel'
import { ApplicationViewModel } from '../ApplicationViewModel'
import { VerseAddedToInboxToastViewModel } from './VerseAddedToInboxToastViewModel'
import { VerseDialogViewModel } from './VerseDialogViewModel'

export class LibraryPageViewModel extends ViewModel {
  constructor(private readonly shlokas: ApplicationViewModel) {
    super()

    watch([this.shlokas.settings.language, this.filterQuery], async () => {
      await this.findByContent(
        this.shlokas.settings.language.value as Language,
        this.filterQuery.value
    )})
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public readonly verseDialog = new VerseDialogViewModel()
  public readonly verseAddedToast = new VerseAddedToInboxToastViewModel()
  public readonly filterQuery = ref()
  public readonly filteredVerses: Ref<VerseViewModel[]> =ref([])


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  open() {
    this.filterQuery.value = ''
  }

  async findByContent(lang: Language, query: string) {
    const verses = await this.shlokas.app.library.findByContent(lang, query)
    this.filteredVerses.value = await Promise.all(verses.map(async (verse) => { // TODO: N+1 issue
      const status = (await this.shlokas.app.library.getStatus(verse.id)).value
      return markRaw(new VerseViewModel(verse, status))
    }))
  }

  async closeModal(ev: CustomEvent<OverlayEventDetail>) {
    const detail = ev.detail

    if (detail.role === 'confirm') {
      await this.verseDialog.addVerseToInbox()
      await this.verseDialog.verse.sync()
      await this.shlokas.inboxDeck.sync()
      this.verseAddedToast.open(this.verseDialog.verse)
    }

    this.verseDialog.close()
  }
}
