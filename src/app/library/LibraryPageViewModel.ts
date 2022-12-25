import { Language } from '@akdasa-studios/shlokas-core'
import { OverlayEventDetail } from '@ionic/core/components'
import { computed, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { VerseViewModel } from '@/app/library'
import { shlokas } from '@/application'
import { VerseAddedToInboxToastViewModel } from './VerseAddedToInboxToastViewModel'
import { VerseDialogViewModel } from './VerseDialogViewModel'


export class LibraryPageViewModel extends ViewModel {
  sync() {
    // this.filteredVerses.value.forEach(x => x.sync())
  }

  /* ------------------------------ Search verses ----------------------------- */
  public readonly searchQuery = ref('')
  public readonly filteredVerses = computed(() => {
    const verses = shlokas.app.library.findByContent(
      shlokas.settings.language.value as Language,
      this.searchQuery.value
    )

    return verses.map(verse => {
      // TODO: N+1 issue
      const status = shlokas.app.library.getStatus(verse.id).value
      return new VerseViewModel(verse, status)
    })
  })

  public readonly verseDialog = new VerseDialogViewModel()
  public readonly verseAddedToast = new VerseAddedToInboxToastViewModel()


  closeModal(ev: CustomEvent<OverlayEventDetail>) {
    const detail = ev.detail

    if (detail.role === 'confirm') {
      this.verseDialog.addVerseToInbox()
      shlokas.inboxDeck.sync()
      this.verseAddedToast.open(this.verseDialog.verse)
      this.verseDialog.verse.sync()
    }

    this.verseDialog.close()
    this.sync()
  }
}
