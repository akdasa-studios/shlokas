import { AddVerseToInboxDeck, Verse, VerseId } from '@akdasa-studios/shlokas-core'
import { OverlayEventDetail } from '@ionic/core/components'
import { computed, ref } from "vue"
import { VerseViewModel } from './VerseViewModel'
import { root } from '@/application'

export class LibraryViewModel {

  /* ------------------------------ Search verses ----------------------------- */
  public readonly searchQuery = ref("")
  public readonly filteredVerses = computed(() => {
    const verses = root.app.library.finqByString(this.searchQuery.value)
    return verses.map(x => new VerseViewModel(x))
  })

  /* ------------------------------ Modal dialog ------------------------------ */
  public readonly openedVerse = ref<VerseViewModel>(VerseViewModel.empty)
  public readonly isModalOpen = ref(false)
  public readonly isToastOpen = ref(false)


  /* -------------------------------------------------------------------------- */
  /*                                    Modal                                   */
  /* -------------------------------------------------------------------------- */

  openModal(verse: Verse) {
    this.openedVerse.value = new VerseViewModel(verse)
    this.isModalOpen.value = true
  }

  closeModal(ev: CustomEvent<OverlayEventDetail>) {
    const detail = ev.detail
    this.isModalOpen.value = false

    if (detail.role === 'confirm') {
      const command = new AddVerseToInboxDeck(new VerseId(detail.data.verseId))
      root.execute(command)
      root.inbox.sync()
      this.openToast()
    }
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
  }
}
