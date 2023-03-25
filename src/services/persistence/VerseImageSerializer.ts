import { VerseId, VerseImage, VerseImageId } from '@akdasa-studios/shlokas-core'
import { ObjectMapper } from './ObjectMapper'


export class VerseImageSerializer implements ObjectMapper<VerseImage, any> {
  map(): any { throw new Error('Should not be executed') }
}

export class VerseImageDeserializer implements ObjectMapper<any, VerseImage> {
  map(from: any): VerseImage {
    const ob = new VerseImage(
      new VerseImageId(from['_id']),
      new VerseId(from['verseId']),
      from['theme'],
      from['url']
    )
    return ob
  }
}