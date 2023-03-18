import { InboxCard, InboxCardType, VerseId } from '@akdasa-studios/shlokas-core'
import { ObjectMapper } from './ObjectMapper'


export class InboxCardSerializer implements ObjectMapper<InboxCard, any> {
  map(from: InboxCard): any {
    return {
      '_id': from.id.value,
      '@type': 'inbox',
      'verseId': from.verseId.value,
      'type': from.type,
      'addedAt': from.addedAt,
      'memorizedAt': from.memorizedAt,
      'version': from.version,
    }
  }
}

export class InboxCardDeserializer implements ObjectMapper<any, InboxCard> {
  map(from: any): InboxCard {
    const card = new InboxCard(
      new VerseId(from['verseId']),
      from['type'] as InboxCardType,
      new Date(from['addedAt']),
      from['memorizedAt'] ? new Date(from['memorizedAt']) : undefined
    )
    card.version = from['version']
    return card
  }
}