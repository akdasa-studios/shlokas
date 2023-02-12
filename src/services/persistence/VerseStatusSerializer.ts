import { Result } from "@akdasa-studios/framework"
import { Decks, VerseId, VerseStatus } from "@akdasa-studios/shlokas-core"
import { ObjectMapper } from "./ObjectMapper"


export class VerseStatusSerializer implements ObjectMapper<VerseStatus, any> {
  map(from: VerseStatus): Result<any, string> {
    return Result.ok({
      "_id": from.id.value,
      "@type": "verseStatus",
      "verseId": from.verseId.value,
      "inDeck": from.inDeck,
      "version": from.version,
    })
  }
}

export class VerseStatusDeserializer implements ObjectMapper<any, VerseStatus> {
  map(from: any): Result<VerseStatus, string> {
    const ob = new VerseStatus(
      new VerseId(from["verseId"]),
      from['inDeck'] as Decks
    )
    ob.version = from['version']
    return Result.ok(ob)
  }
}