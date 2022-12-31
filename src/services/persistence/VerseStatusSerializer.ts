import { Result } from "@akdasa-studios/framework"
import { Decks, VerseId, VerseStatus, VerseStatusId } from "@akdasa-studios/shlokas-core"
import { ObjectMapper } from "./ObjectMapper"


export class VerseStatusSerializer implements ObjectMapper<VerseStatus, any> {
  map(from: VerseStatus): Result<any, string> {
    return Result.ok({
      "_id": from.id.value,
      "@type": "verseStatus",
      "verseId": from.verseId.value,
      "inDeck": from.inDeck,
    })
  }
}

export class VerseStatusDeserializer implements ObjectMapper<any, VerseStatus> {
  map(from: any): Result<VerseStatus, string> {
    return Result.ok(new VerseStatus(
      new VerseStatusId(from["_id"]),
      new VerseId(from["verseId"]),
      from['inDeck'] as Decks
    ))
  }
}