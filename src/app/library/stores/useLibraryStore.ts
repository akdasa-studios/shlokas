import { Application, Language, Verse, VerseId, VerseStatus } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { reactive, ref, Ref } from 'vue'


export function useLibraryStore(app: Application) {
  return defineStore('library', () => {
    const verses   = reactive<Record<string, Verse>>({})
    const statuses = reactive<Record<string, Ref<VerseStatus>>>({})

    async function getStatus(verseId: VerseId): Promise<Ref<VerseStatus>> {
      return statuses[verseId.value]
    }

    async function getByContent(lang: Language, query: string) {
      const foundVerses     = await app.library.findByContent(lang, query)
      const relatedStatuses = await app.library.getStatuses(foundVerses.map(x => x.id))

      // Cache loaded resources
      foundVerses.forEach(x => verses[x.id.value] = x)
      foundVerses.forEach(x => {
        // @ts-ignore
        statuses[x.id.value] = ref({})
        statuses[x.id.value].value = relatedStatuses[x.id.value]
      })

      return foundVerses
    }

    async function sync(verseId: VerseId) {
      statuses[verseId.value].value = await app.library.getStatus(verseId)
    }


    return { getByContent, getStatus, verses, sync }
  })()
}
