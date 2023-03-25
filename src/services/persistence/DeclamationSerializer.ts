import { Declamation, DeclamationId, VerseId } from '@akdasa-studios/shlokas-core'
import { ObjectMapper } from './ObjectMapper'


export class DeclamationSerializer implements ObjectMapper<Declamation, any> {
  map(): any { throw new Error('Should not be executed') }
}

export class DeclamationDeserializer implements ObjectMapper<any, Declamation> {
  map(from: any): Declamation {
    const ob = new Declamation(
      new DeclamationId(from['_id']),
      from['verseReference'].length === 36 ? new VerseId(from['verseReference']) : from['verseReference'],
      from['type'],
      from['theme'],
      from['url'],
      from['markers']
    )
    return ob
  }
}