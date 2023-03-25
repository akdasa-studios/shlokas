import { InMemoryRepository } from '@akdasa-studios/framework'
import { SyncRepository } from '@akdasa-studios/framework-sync'
import { Declamation, InboxCard, Repositories, ReviewCard, Verse, VerseImage, VerseStatus } from '@akdasa-studios/shlokas-core'
import {
  CouchDB, DeclamationDeserializer, DeclamationSerializer, InboxCardDeserializer,
  InboxCardSerializer, PouchRepository, ReviewCardDeserializer,
  ReviewCardSerializer, VerseImageDeserializer, VerseImageSerializer, VerseStatusDeserializer, VerseStatusSerializer
} from '@/services/persistence'


export function createRepositories(remote: string) {
  const couchDB = new CouchDB(remote)

  return new Repositories(
    new InMemoryRepository<Verse>(),
    new PouchRepository<VerseImage>(
      couchDB,
      'verseImage',
      new VerseImageSerializer(),
      new VerseImageDeserializer()
    ),
    new PouchRepository<Declamation>(
      couchDB,
      'declamation',
      new DeclamationSerializer(),
      new DeclamationDeserializer()
    ),
    new SyncRepository(new PouchRepository<VerseStatus>(
      couchDB,
      'verseStatus',
      new VerseStatusSerializer(),
      new VerseStatusDeserializer()
    )),
    new SyncRepository(new PouchRepository<InboxCard>(
      couchDB,
      'inbox',
      new InboxCardSerializer(),
      new InboxCardDeserializer()
    )),
    new SyncRepository(new PouchRepository<ReviewCard>(
      couchDB,
      'review',
      new ReviewCardSerializer(),
      new ReviewCardDeserializer()
    )),
  )
}