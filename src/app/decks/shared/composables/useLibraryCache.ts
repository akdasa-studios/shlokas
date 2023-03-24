import { Application, Declamation, Verse, VerseId } from '@akdasa-studios/shlokas-core'

const verses = new Map<string, Verse>()
const declamations = new Map<string, Declamation[]>()

export function useLibraryCache(app: Application) {
  async function load(verseIds: VerseId[]) {
    for (const verseId of verseIds) {
      if (verses.has(verseId.value)) { continue }

      const verse = await app.library.getById(verseId)
      verses.set(verse.id.value, verse)

      if (!declamations.has(verseId.value)) {
        declamations.set(verseId.value, [])
      }

      declamations.get(verseId.value)?.push(
        ...await app.library.getDeclamations(verseId)
      )
      declamations.get(verseId.value)?.push(
        ...await app.library.getDeclamations(verse.reference)
      )

    }
  }

  function getVerse(verseId: VerseId): Verse {
    return verses.get(verseId.value) as Verse
  }

  function getDeclamations(verseId: VerseId) {
    return declamations.get(verseId.value) || []
  }

  return {
    load, getVerse, getDeclamations
  }
}