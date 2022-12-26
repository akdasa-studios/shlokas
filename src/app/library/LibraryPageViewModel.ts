import { Language } from '@akdasa-studios/shlokas-core'
import { OverlayEventDetail } from '@ionic/core/components'
import { computed, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { VerseViewModel } from '@/app/library'
import { ApplicationViewModel } from '../ApplicationViewModel'
import { VerseAddedToInboxToastViewModel } from './VerseAddedToInboxToastViewModel'
import { VerseDialogViewModel } from './VerseDialogViewModel'


export class LibraryPageViewModel extends ViewModel {
  constructor(private readonly shlokas: ApplicationViewModel) {
    super()
  }

  public readonly verseDialog = new VerseDialogViewModel()
  public readonly verseAddedToast = new VerseAddedToInboxToastViewModel()
  public readonly filterQuery = ref('')
  public readonly filteredVerses = computed(() => this.findByContent(this.filterQuery.value))


  findByContent(query: string): VerseViewModel[] {
    const verses = this.shlokas.app.library.findByContent(
      this.shlokas.settings.language.value as Language, query
    )
    return verses.map(verse => { // TODO: N+1 issue
      const status = this.shlokas.app.library.getStatus(verse.id).value
      return new VerseViewModel(verse, status)
    })
  }

  closeModal(ev: CustomEvent<OverlayEventDetail>) {
    const detail = ev.detail

    if (detail.role === 'confirm') {
      this.verseDialog.addVerseToInbox()
      this.verseAddedToast.open(this.verseDialog.verse)
      this.verseDialog.verse.sync()
      this.shlokas.inboxDeck.sync()
    }

    this.verseDialog.close()
  }
}
