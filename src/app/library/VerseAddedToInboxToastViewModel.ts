import { ref } from "vue"
import { VerseViewModel } from '@/app/library'
import { shlokas } from "@/application"


export class VerseAddedToInboxToastViewModel {

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public readonly isOpen = ref(false)
  public verse: VerseViewModel | undefined

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  open(verse: VerseViewModel) {
    this.isOpen.value = true
    this.verse = verse
  }

  close() {
    this.isOpen.value = false
    this.verse = undefined
  }

  revert() {
    shlokas.app.processor.revert()
    shlokas.inboxDeck.sync()
    this.verse?.sync()
    // shlokas.library.sync()
  }
}