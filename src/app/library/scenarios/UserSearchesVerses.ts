import { Application, Language } from "@akdasa-studios/shlokas-core"
import { markRaw, ref, Ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { LibraryVerse } from '@/app/library'
import { useLocaleStore } from "@/app/settings"


export class UserSearchesVerses {
  public verses: Ref<LibraryVerse[]> = ref([])
  public query = ref("")

  private _app: Application
  private _locale
  private _language


  constructor(app: Application) {
    this._app = app
    this._locale = useLocaleStore()
    this._language = storeToRefs(this._locale).language

    watch(
      [this._language, this.query],
      () => this.types(),
      { immediate :true }
    )
  }


  async types() {
    this.verses.value = await this.findByContent(this._language.value, this.query.value)
  }

  private async findByContent(lang: Language, query: string) {
    const verses = await this._app.library.findByContent(lang, query)
    const statuses = await this._app.library.getStatuses(verses.map(x => x.id))

    return verses.map((verse) => {
      return markRaw(new LibraryVerse(verse, statuses[verse.id.value]))
    })
  }
}