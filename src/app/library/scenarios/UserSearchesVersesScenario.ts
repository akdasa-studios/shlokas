import { Application } from "@akdasa-studios/shlokas-core"
import { storeToRefs } from "pinia"
import { ref, Ref, watch } from "vue"
import { useLocaleStore } from "@/app/settings"
import { LibraryVerse, useLibraryStore } from '@/app/library'


export class UserSearchesVersesScenario {
  public verses: Ref<LibraryVerse[]> = ref([])
  public query = ref("")

  private _language
  private readonly _localeStore
  private readonly _libraryStore


  constructor(app: Application) {
    this._localeStore = useLocaleStore()
    this._libraryStore = useLibraryStore(app)
    this._language = storeToRefs(this._localeStore).language

    watch(
      [this._language, this.query],
      () => this.onQueryChanged(),
      { immediate :true }
    )
  }

  private async onQueryChanged() {
    this.verses.value = await this._libraryStore.findByContent(this._language.value, this.query.value)
  }
}