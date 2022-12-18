import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, UpdateVerseStatus, Verse, VerseId } from '@akdasa-studios/shlokas-core'
import { OverlayEventDetail } from '@ionic/core/components'
import { computed, ref } from "vue"
import { VerseViewModel } from './VerseViewModel'
import { root } from '@/application'

export class LibraryViewModel {

  /* ------------------------------ Search verses ----------------------------- */
  public readonly searchQuery = ref("")
  public readonly filteredVerses = computed(() => {
    const verses = root.app.library.finqByString(this.searchQuery.value)
    return verses.map(verse => {
      // TODO: N+1 issue
      const status = root.app.library.getStatusById(verse.id).value
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
    console.log(verse)
    const status = root.app.library.getStatusById(verse.id).value
    this.openedVerse = new VerseViewModel(verse, status)
    this.isModalOpen.value = true
  }

  closeModal(ev: CustomEvent<OverlayEventDetail>) {
    const detail = ev.detail
    this.isModalOpen.value = false

    if (detail.role === 'confirm') {
      const transaction = new Transaction("!!!!")
      root.execute(new AddVerseToInboxDeck(detail.data.verseId as VerseId), transaction)
      root.execute(new UpdateVerseStatus(detail.data.verseId as VerseId), transaction)
      root.inbox.sync()
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
    root.app.processor.revert();
    root.inbox.sync()
    this.sync()
  }

  sync() {
    this.filteredVerses.value.forEach(x => x.sync())
  }
}