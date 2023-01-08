import { ref } from "vue"
// import { shlokas } from "@/application"


export class CardMemorizedToastViewModel {

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public readonly isOpen = ref(false)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  open() {
    this.isOpen.value = true
  }

  close() {
    this.isOpen.value = false
  }

  async revert() {
    // await shlokas.app.processor.revert()
    // await shlokas.inboxDeck.sync()
    // await shlokas.reviewDeck.sync()
  }
}