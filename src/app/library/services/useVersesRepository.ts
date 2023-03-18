import { Application, Verse, VerseId } from '@akdasa-studios/shlokas-core'

export function useVersesRepository(
  app: Application
) {

  async function getVerse(verseId: VerseId): Promise<Verse> {
    return await app.library.getById(verseId)
  }

}