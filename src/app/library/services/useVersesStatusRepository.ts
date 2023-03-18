import { Application, VerseId, VerseStatus } from '@akdasa-studios/shlokas-core'

export function useVersesStatusRepository(
  app: Application
) {

  async function getStatusOfVerse(verseId: VerseId): Promise<VerseStatus> {
    return await app.library.getStatus(verseId)
  }

  return { getStatusOfVerse }
}