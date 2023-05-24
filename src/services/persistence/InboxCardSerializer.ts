import { InboxCard, InboxCardType, VerseId } from '@akdasa-studios/shlokas-core'
import { dateAndTime } from './convert'
import { ObjectMapper } from './ObjectMapper'


export class InboxCardSerializer implements ObjectMapper<InboxCard, any> {
  map(from: InboxCard): any {
    return {
      '_id': from.id.value,
      '@type': 'inbox',
      'verseId': from.verseId.value,
      'type': from.type,
      'addedAt': dateAndTime(from.addedAt),
      'memorizedAt': dateAndTime(from.memorizedAt),
      'version': from.version,
      'modifiedAt': from.modifiedAt,
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
    card.modifiedAt = from['modifiedAt']
    return card
  }
}