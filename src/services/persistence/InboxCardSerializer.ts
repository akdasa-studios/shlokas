import { Result } from "@akdasa-studios/framework"
import { InboxCard, InboxCardType, VerseId } from "@akdasa-studios/shlokas-core"
import { ObjectMapper } from "./ObjectMapper"


export class InboxCardSerializer implements ObjectMapper<InboxCard, any> {
  map(from: InboxCard): Result<any, string> {
    return Result.ok({
      "_id": from.id.value,
      "@type": "inbox",
      "verseId": from.verseId.value,
      "type": from.type,
      "addedAt": from.addedAt,
      "memorizedAt": from.memorizedAt,
      "version": from.version,
    })
  }
}

export class InboxCardDeserializer implements ObjectMapper<any, InboxCard> {
  map(from: any): Result<InboxCard, string> {
    const card = new InboxCard(
      new VerseId(from["verseId"]),
      from['type'] as InboxCardType,
      new Date(from['addedAt']),
      new Date(from['memorizedAt'])
    )
    card.version = from['version']
    return Result.ok(card)
  }
}