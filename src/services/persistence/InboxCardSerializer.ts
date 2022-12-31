import { ObjectMapper } from "@akdasa-studios/framework-firebase"
import { CardId, InboxCard, InboxCardType, VerseId } from "@akdasa-studios/shlokas-core"
import { Result } from "@akdasa-studios/framework"


export class InboxCardSerializer implements ObjectMapper<InboxCard, any> {
  map(from: InboxCard): Result<any, string> {
    return Result.ok({
      "_id": from.id.value,
      "@type": "inbox",
      "verseId": from.verseId.value,
      "type": from.type,
      "addedAt": from.addedAt
    })
  }
}

export class InboxCardDeserializer implements ObjectMapper<any, InboxCard> {
  map(from: any): Result<InboxCard, string> {
    return Result.ok(new InboxCard(
      new CardId(from["_id"]),
      new VerseId(from["verseId"]),
      from['type'] as InboxCardType,
      new Date(from['addedAt'])
    ))
  }
}