import { ReviewCard, ReviewCardType, VerseId } from '@akdasa-studios/shlokas-core'
import { date, dateAndTime } from './convert'
import { ObjectMapper } from './ObjectMapper'


export class ReviewCardSerializer implements ObjectMapper<ReviewCard, any> {
  map(from: ReviewCard): any {
    return {
      '_id': from.id.value,
      '@type': 'review',
      'verseId': from.verseId.value,
      'type': from.type,
      'addedAt': dateAndTime(from.addedAt),
      'dueTo': date(from.dueTo),
      'version': from.version,
      'interval': from.interval,
      'ease': from.ease,
      'lapses': from.lapses,
      'difficultyChangedAt': from.difficultyChangedAt,
    }
  }
}

export class ReviewCardDeserializer implements ObjectMapper<any, ReviewCard> {
  map(from: any): ReviewCard  {
    const ob = new ReviewCard(
      new VerseId(from['verseId']),
      from['type'] as ReviewCardType,
      new Date(from['addedAt']),
      new Date(from['dueTo']),
    )
    ob.setStats(
      new Date(from['dueTo']),
      parseInt(from['interval']),
      parseInt(from['ease']),
      parseInt(from['lapses']),
      from['difficultyChangedAt'] ? new Date(from['difficultyChangedAt']) : new Date(from['addedAt'])
    )
    ob.version = from['version']
    return ob
  }
}