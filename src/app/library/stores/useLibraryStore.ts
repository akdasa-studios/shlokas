import { Aggregate, AnyIdentity } from '@akdasa-studios/framework'
import { Application, Language, NoStatus, Verse, VerseId, VerseStatus, VerseStatusQueries } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { DomainViewModel } from '@/app/DomainViewModel'


export function useLibraryStore(app: Application) {
  return defineStore('library', () => {
    const versesCache   = new Map<string, DomainViewModel<Verse>>()
    const statusesCache = new Map<string, DomainViewModel<VerseStatus>>()

    async function getStatus(verseId: VerseId): Promise<DomainViewModel<VerseStatus>> {
      if (statusesCache.has(verseId.value)) {
        return statusesCache.get(verseId.value) as DomainViewModel<VerseStatus>
      }
      const dummyEntity = new DomainViewModel(
        NoStatus,
        VerseStatusQueries.verseId(verseId)
      )
      statusesCache.set(verseId.value, dummyEntity)
      return dummyEntity
    }

    async function getByContent(lang: Language, query: string) {
      const foundVerses = await app.library.findByContent(lang, query)
      const statuses    = await app.library.getStatuses(foundVerses.map(x => x.id))
      const result = []
      for (const verse of foundVerses) {
        const dm = load(versesCache, verse)
        if (statuses[verse.id.value] !== NoStatus) {
          load(statusesCache, statuses[verse.id.value], verse.id.value)
        }

        result.push(dm)
      }
      return result
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Private                                  */
    /* -------------------------------------------------------------------------- */

    function load<K, V extends Aggregate<AnyIdentity>>(cache: Map<K, DomainViewModel<V>>, object: V, forceKey?: K) {
      const entity = new DomainViewModel(object)
      cache.set(forceKey || entity.object.id.value, entity)
      return entity
    }

    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { getByContent, getStatus }
  })()
}
