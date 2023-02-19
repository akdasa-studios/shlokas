import { InMemoryRepository } from '@akdasa-studios/framework'
import { SyncRepository } from '@akdasa-studios/framework-sync'
import { InboxCard, Repositories, ReviewCard, Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import {
  CouchDB, InboxCardDeserializer,
  InboxCardSerializer, PouchRepository, ReviewCardDeserializer,
  ReviewCardSerializer, VerseStatusDeserializer, VerseStatusSerializer
} from '@/services/persistence'


export function createRepositories(remote: string) {
  const couchDB = new CouchDB(remote)
  return new Repositories(
    new InMemoryRepository<Verse>(),
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