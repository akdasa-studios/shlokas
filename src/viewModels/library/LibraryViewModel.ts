import { ApplicationViewModel } from '@/viewModels/application/ApplicationViewModel';
import { AddVerseToInboxDeck, Verse, VerseId } from '@akdasa-studios/shlokas-core';
import { OverlayEventDetail } from '@ionic/core/components';
import { computed, ref } from "vue";
import { EmptyVerseViewModel, VerseViewModel } from './VerseViewModel';


export class LibraryViewModel {
  public readonly app: ApplicationViewModel
  public readonly searchQuery = ref("")
  public readonly modalVerse = ref<VerseViewModel>(EmptyVerseViewModel)
  public readonly isModalOpen = ref(false)
  public readonly isToastOpen = ref(false)
  public readonly filteredVerses = computed(() => {
    return this.app.app.library.finqByString(this.searchQuery.value)
  })

  constructor(app: ApplicationViewModel) {
    this.app = app
  }

  async closeModal(ev: CustomEvent<OverlayEventDetail>) {
    this.isModalOpen.value = false
    console.log(ev.detail.data)

    if (ev.detail.role === 'confirm') {
      this.app.app.processor.execute(new AddVerseToInboxDeck(new VerseId(ev.detail.data.verseId)))
      this.app.counters.sync()
      this.isToastOpen.value = true
    }
  }

  revert() {
    console.log("revert")
    this.app.app.processor.revert();
    this.app.counters.sync()
  }

  async openModal(verse: Verse) {
    this.modalVerse.value = new VerseViewModel()
    this.modalVerse.value.verseId = verse.id.value
    this.modalVerse.value.title = verse.number.toString()
    this.modalVerse.value.translation = verse.translation.text
    this.modalVerse.value.text = verse.text.lines
    this.isModalOpen.value = true


  }

}

export const useLibrary = (applicationViewModel: ApplicationViewModel) => {
  return new LibraryViewModel(applicationViewModel)
}
