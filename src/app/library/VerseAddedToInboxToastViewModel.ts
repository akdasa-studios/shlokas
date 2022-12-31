import { ref } from "vue"
import { VerseViewModel } from '@/app/library'
import { shlokas } from "@/application"


export class VerseAddedToInboxToastViewModel {

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public readonly isOpen = ref(false)
  public verse: VerseViewModel = VerseViewModel.empty

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  open(verse: VerseViewModel) {
    this.isOpen.value = true
    this.verse = verse
  }

  close() {
    this.isOpen.value = false
  }

  async revert() {
    await shlokas.app.processor.revert()
    await shlokas.inboxDeck.sync()
    this.verse.sync()
  }
}