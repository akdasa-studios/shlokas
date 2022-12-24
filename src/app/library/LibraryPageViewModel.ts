import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, Language, UpdateVerseStatus, Verse, VerseId } from '@akdasa-studios/shlokas-core'
import { OverlayEventDetail } from '@ionic/core/components'
import { computed, ref } from 'vue'
import { root } from '@/application'
import { ViewModel } from '@/app/DomainViewModel'
import { VerseViewModel } from '@/app/library'


export class LibraryPageViewModel implements ViewModel {

  sync() {
    this.filteredVerses.value.forEach(x => x.sync())
  }

  /* ------------------------------ Search verses ----------------------------- */
  public readonly searchQuery = ref('')
  public readonly filteredVerses = computed(() => {
    const verses = root.app.library.findByContent(
      root.settings.language.value as Language,
      this.searchQuery.value
    )

    return verses.map(verse => {
      // TODO: N+1 issue
      const status = root.app.library.getStatus(verse.id).value
      return new VerseViewModel(verse, status)
    })
  })

  /* ------------------------------ Modal dialog ------------------------------ */
  public openedVerse: VerseViewModel = VerseViewModel.empty
  public readonly isModalOpen = ref(false)
  public readonly isToastOpen = ref(false)


  /* -------------------------------------------------------------------------- */
  /*                                    Modal                                   */
  /* -------------------------------------------------------------------------- */

  openModal(verse: Verse) {
    const status = root.app.library.getStatus(verse.id).value
    this.openedVerse = new VerseViewModel(verse, status)
    this.isModalOpen.value = true
  }

  closeModal(ev: CustomEvent<OverlayEventDetail>) {
    const detail = ev.detail
    this.isModalOpen.value = false

    if (detail.role === 'confirm') {
      const transaction = new Transaction('!!!!')
      root.execute(new AddVerseToInboxDeck(detail.data.verseId as VerseId), transaction)
      root.execute(new UpdateVerseStatus(detail.data.verseId as VerseId), transaction)
      root.inboxDeck.sync()
      this.openToast()
    }
    this.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Toast                                   */
  /* -------------------------------------------------------------------------- */

  openToast() {
    this.isToastOpen.value = true
  }

  closeToast() {
    this.isToastOpen.value = false
  }

  revertLastAction() {
    root.app.processor.revert()
    root.inboxDeck.sync()
    this.sync()
  }
}
