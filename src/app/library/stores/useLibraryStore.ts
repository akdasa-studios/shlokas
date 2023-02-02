import { Application, Language, Verse, VerseId, VerseStatus } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { reactive, ref, Ref } from 'vue'


export function useLibraryStore(app: Application) {
  return defineStore('library', () => {
    const verses   = reactive<Record<string, Verse>>({})
    const statuses = reactive<Record<string, Ref<VerseStatus>>>({})

    async function getVerse(verseId: VerseId) {
      return (await app.library.getById(verseId)).value
    }

    async function getStatus(verseId: VerseId): Promise<Ref<VerseStatus>> {
      const statusIsCached = verseId.value in statuses
      if (!statusIsCached) { await sync(verseId) }
      return statuses[verseId.value]
    }

    async function getByContent(lang: Language, query: string) {
      const foundVerses     = await app.library.findByContent(lang, query)
      const relatedStatuses = await app.library.getStatuses(foundVerses.map(x => x.id))

      // Cache loaded resources
      foundVerses.forEach(x => verses[x.id.value] = x)
      foundVerses.forEach(x => {
        statuses[x.id.value] = ref({}) as Ref<VerseStatus>
        statuses[x.id.value].value = relatedStatuses[x.id.value]
      })

      return foundVerses
    }

    async function sync(verseId: VerseId) {
      statuses[verseId.value].value = await app.library.getStatus(verseId)
    }

    return { getByContent, getStatus, getVerse, verses, statuses, sync }
  })()
}
