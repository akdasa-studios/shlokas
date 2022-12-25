import { ref } from "vue"
import { shlokas } from "@/application"


export class CardMemorizedToastViewModel {
  public readonly isOpen = ref(false)

  open() {
    this.isOpen.value = true
  }

  close() {
    this.isOpen.value = false
  }

  revert() {
    shlokas.app.processor.revert()
    shlokas.inboxDeck.sync()
    shlokas.reviewDeck.sync()
  }
}