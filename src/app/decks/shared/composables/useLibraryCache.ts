import { Application, Declamation, Verse, VerseId, VerseImage } from '@akdasa-studios/shlokas-core'

const verses = new Map<string, Verse>()
const declamations = new Map<string, Declamation[]>()
const verseImages = new Map<string, VerseImage[]>()

export function useLibraryCache(app: Application) {
  async function load(verseIds: VerseId[]) {
    for (const verseId of verseIds) {
      if (verses.has(verseId.value)) { continue }

      const verse = await app.library.getById(verseId)
      verses.set(verse.id.value, verse)

      if (!declamations.has(verseId.value)) {
        declamations.set(verseId.value, [])
      }

      if (!verseImages.has(verseId.value)) {
        verseImages.set(verseId.value, [])
      }

      declamations.get(verseId.value)?.push(
        ...await app.library.getDeclamations(verseId)
      )
      declamations.get(verseId.value)?.push(
        ...await app.library.getDeclamations(verse.reference)
      )

      verseImages.get(verseId.value)?.push(
        ...await app.library.getImages(verseId)
      )
    }
  }

  function getVerse(verseId: VerseId): Verse {
    return verses.get(verseId.value) as Verse
  }

  function getDeclamations(verseId: VerseId) {
    return declamations.get(verseId.value) || []
  }

  function getVerseImage(verseId: VerseId, theme = 'default'): VerseImage|undefined {
    return verseImages.get(verseId.value)?.find(x => x.theme === theme)
  }

  return {
    load, getVerse, getDeclamations, getVerseImage
  }
}