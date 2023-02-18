import { Result } from '@akdasa-studios/framework'
import { ReviewCard, ReviewCardType, VerseId } from '@akdasa-studios/shlokas-core'
import { ObjectMapper } from './ObjectMapper'


export class ReviewCardSerializer implements ObjectMapper<ReviewCard, any> {
  map(from: ReviewCard): Result<any, string> {
    return Result.ok({
      '_id': from.id.value,
      '@type': 'review',
      'verseId': from.verseId.value,
      'type': from.type,
      'addedAt': from.addedAt,
      'dueTo': from.dueTo,
      'version': from.version,
    })
  }
}

export class ReviewCardDeserializer implements ObjectMapper<any, ReviewCard> {
  map(from: any): Result<ReviewCard, string> {
    const ob = new ReviewCard(
      new VerseId(from['verseId']),
      from['type'] as ReviewCardType,
      new Date(from['addedAt']),
      new Date(from['dueTo']),
    )
    ob.version = from['version']
    return Result.ok(ob)
  }
}