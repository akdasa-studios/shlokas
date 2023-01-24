import { Application } from "@akdasa-studios/shlokas-core"
import { storeToRefs } from "pinia"
import { markRaw, ref, Ref, watch } from "vue"
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

    // function createViewModel(verse: Verse, status: VerseStatus) {
    //   const viewModel = markRaw(new LibraryVerse(verse, status))
    //   library.set(verse.id.value, viewModel)
    //   return viewModel
    // }
  private async onQueryChanged() {
    const verses = await this._libraryStore.getByContent(this._language.value, this.query.value)
    const result = []
    for (const verse of verses) {
      const status = await this._libraryStore.getStatus(verse.object.id)
      const viewModel = markRaw(new LibraryVerse(verse, status))
      result.push(viewModel)
    }
    this.verses.value = result
  }
}