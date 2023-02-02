import { InMemoryRepository } from '@akdasa-studios/framework'
import { Application, InboxCard, Repositories, ReviewCard, Verse, VerseStatus } from "@akdasa-studios/shlokas-core"
import { Capacitor } from '@capacitor/core'
import {
  CouchDB, InboxCardDeserializer,
  InboxCardSerializer, PouchRepository, ReviewCardDeserializer,
  ReviewCardSerializer, VerseStatusDeserializer, VerseStatusSerializer
} from '@/services/persistence'


export let couchDB: CouchDB

export async function createShlokasApplication() {
  couchDB = new CouchDB(
    "local",
    Capacitor.getPlatform() == 'ios' ? 'cordova-sqlite' : undefined
  )

  const repositories = new Repositories(
    new InMemoryRepository<Verse>(),
    new PouchRepository<VerseStatus>(
      couchDB,
      "verseStatus",
      new VerseStatusSerializer(),
      new VerseStatusDeserializer()
    ),
    new PouchRepository<InboxCard>(
      couchDB,
      "inbox",
      new InboxCardSerializer(),
      new InboxCardDeserializer()
    ),
    new PouchRepository<ReviewCard>(
      couchDB,
      "review",
      new ReviewCardSerializer(),
      new ReviewCardDeserializer()
    ),
  )
  return [
    new Application(repositories),
    couchDB
  ]
}
