import { Application, Language, Verse, VerseId, VerseStatus } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { markRaw, reactive } from 'vue'
import { LibraryVerse } from './../models/LibraryVerse'


export function useLibraryStore(app: Application) {
  return defineStore('library', () => {
    const verses = reactive(new Map<string, LibraryVerse>())

    function getViewModel(verse: Verse, status: VerseStatus) {
      const viewModel = markRaw(new LibraryVerse(verse, status))
      verses.set(verse.id.value, viewModel)
      return viewModel
    }

    function getByVerseId(verseId: VerseId) {
      return verses.get(verseId.value)
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Actions                                  */
    /* -------------------------------------------------------------------------- */

    async function findByContent(lang: Language, query: string) {
      const loadedVerses = await app.library.findByContent(lang, query)
      const loadedStatuses = await app.library.getStatuses(loadedVerses.map(x => x.id))
      return loadedVerses.map(
        (verse) => getViewModel(verse, loadedStatuses[verse.id.value])
      )
    }

    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { findByContent, getByVerseId, verses }
  })()
}
