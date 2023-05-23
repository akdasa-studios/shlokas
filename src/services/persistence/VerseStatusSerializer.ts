import { Decks, VerseId, VerseStatus } from '@akdasa-studios/shlokas-core'
import { ObjectMapper } from './ObjectMapper'


export class VerseStatusSerializer implements ObjectMapper<VerseStatus, any> {
  map(from: VerseStatus): any {
    return {
      '_id': from.id.value,
      '@type': 'verseStatus',
      'verseId': from.verseId.value,
      'inDeck': from.inDeck,
      'version': from.version,
      'syncedAt': from.syncedAt,
    }
  }
}

export class VerseStatusDeserializer implements ObjectMapper<any, VerseStatus> {
  map(from: any): VerseStatus {
    const ob = new VerseStatus(
      new VerseId(from['verseId']),
      from['inDeck'] as Decks
    )
    ob.version = from['version']
    ob.syncedAt = from['syncedAt']
    return ob
  }
}