import { Application, UpdateVerseStatus, VerseId } from '@akdasa-studios/shlokas-core'
import { Emitter } from 'mitt'
import { storeToRefs } from 'pinia'
import { ref, Ref, watch } from 'vue'
import { useLocaleStore } from '@/app/settings'
import { LibraryVerse, useLibraryStore } from '@/app/library'
import { Events } from '@/app/Events'


export class LibraryVersesController {
  public verses: Ref<LibraryVerse[]> = ref([])
  public query = ref('')

  private _language
  private readonly _localeStore
  private readonly _libraryStore


  constructor(app: Application, emitter: Emitter<Events>) {
    this._localeStore = useLocaleStore()
    this._libraryStore = useLibraryStore(app)
    this._language = storeToRefs(this._localeStore).language

    watch(
      [this._language, this.query],
      () => this.onQueryChanged(),
      { immediate: true }
    )

    emitter.on('commandExecuted', async (e) => {
      if (e instanceof UpdateVerseStatus) { await this.refreshVerse(e.verseId)}
    })
    emitter.on('syncCompleted', async () => { await this.onQueryChanged() })
  }

  refreshVerse(verseId: VerseId) { this._libraryStore.sync(verseId) }

  private async onQueryChanged() {
    const verses = await this._libraryStore.getByContent(this._language.value, this.query.value)
    const result = []

    for (const verse of verses) {
      const status = await this._libraryStore.getStatus(verse.id)
      const viewModel = new LibraryVerse(verse, status)
      result.push(viewModel)
    }
    this.verses.value = result
  }
}