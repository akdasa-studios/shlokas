import { ref } from "vue"
import { ApplicationViewModel } from "./ApplicationViewModel"

export class SyncController{
  constructor(
    private readonly shlokas: ApplicationViewModel
  ) {
  }

  public inProgress = ref(true)

  async sync() {
    this.inProgress.value = true

    this.inProgress.value = false
  }
}