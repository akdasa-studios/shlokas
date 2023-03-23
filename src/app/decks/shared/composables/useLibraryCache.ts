import { Application, Declamation, Verse, Language, VerseId } from '@akdasa-studios/shlokas-core'


export function useLibraryCache(app: Application) {
  let verses: readonly Verse[] = []
  let declamations: {[ id: string ]: Declamation[]} = {}

  // TODO: load only requested verses
  async function load(verseIds: VerseId[]) {
    declamations = {}
    verses = await app.library.all(new Language('en', 'en')) // TODO: Load only needed verses

    for (const verse of verses) {
      declamations[verse.id.value] = []
      declamations[verse.id.value].push(
        ...await app.library.getDeclamations(verse.id.value)
      )
      declamations[verse.id.value].push(
        ...await app.library.getDeclamations(verse.reference)
      )
    }
  }

  function getVerse(verseId: VerseId): Verse {
    return verses.find(x => x.id.equals(verseId)) as Verse
  }

  function getDeclamations(verseId: VerseId) {
    return declamations[verseId.value]
  }

  return {
    load, getVerse, getDeclamations
  }
}