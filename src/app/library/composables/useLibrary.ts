import { Application, UpdateVerseStatus, VerseId } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'
import { storeToRefs } from 'pinia'
import { ref, Ref, watch } from 'vue'
import { useLocaleStore } from '@/app/settings'
import { LibraryVerse, useLibraryStore } from '@/app/library'


export function useLibrary(app: Application, emitter: EventEmitter2) {
  const filteredVerses: Ref<LibraryVerse[]> = ref([])
  const searchQuery  = ref('')
  const localeStore  = useLocaleStore()
  const libraryStore = useLibraryStore(app)
  const language     = storeToRefs(localeStore).language

  // Subscribe
  watch(
    [language, searchQuery],
    () => onQueryChanged(),
    { immediate: true }
  )
  emitter.on('commandExecuted', async (e) => {
    if (e instanceof UpdateVerseStatus) { await refreshVerse(e.verseId)}
  })
  emitter.on('syncCompleted', async () => {
    await onQueryChanged()
  })

  function refreshVerse(verseId: VerseId) {
    libraryStore.sync(verseId)
  }

  async function onQueryChanged() {
    const foundVerses = await libraryStore.getByContent(language.value, searchQuery.value)
    const result = []

    for (const verse of foundVerses) {
      const status = await libraryStore.getStatus(verse.id)
      const viewModel = new LibraryVerse(verse, status)
      result.push(viewModel)
    }
    filteredVerses.value = result
  }

  return {
    searchQuery,
    filteredVerses
  }
}