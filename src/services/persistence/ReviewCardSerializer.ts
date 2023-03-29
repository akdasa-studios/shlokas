import { ReviewCard, ReviewCardType, VerseId } from '@akdasa-studios/shlokas-core'
import { ObjectMapper } from './ObjectMapper'


function d(date: Date) {
  return date.setHours(0,0,0,0)
  // return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate()
  // const offset = new Date().getTimezoneOffset()
  // const myDate = Date.parse(dateString) - (offset * 60 * 1000)
  // const dateAsISO = new Date(myDate).toISOString()

  // return dateAsISO
}


export class ReviewCardSerializer implements ObjectMapper<ReviewCard, any> {
  map(from: ReviewCard): any {
    return {
      '_id': from.id.value,
      '@type': 'review',
      'verseId': from.verseId.value,
      'type': from.type,
      'addedAt': from.addedAt,
      'dueTo': d(from.dueTo),
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

    console.log(from['dueTo'], new Date(from['dueTo']))

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