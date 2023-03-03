import { InMemoryRepository } from '@akdasa-studios/framework'
import { SyncRepository } from '@akdasa-studios/framework-sync'
import { Application, InboxCard, Repositories, ReviewCard, Verse, VerseStatus } from '@akdasa-studios/shlokas-core'
import {
  CouchDB, InboxCardDeserializer,
  InboxCardSerializer, PouchRepository, ReviewCardDeserializer,
  ReviewCardSerializer, VerseStatusDeserializer, VerseStatusSerializer
} from '@/services/persistence'
import { InitArgs, InitResult } from '../initialization'

/**
 * Initialize app
 */
export async function initShlokasApp(
  { get }: InitArgs
): Promise<InitResult> {
  const userData = get<CouchDB>('userData')

  const repositories = new Repositories(
    new InMemoryRepository<Verse>(),
    // @ts-ignore
    new PouchRepository<VerseStatus>(
      userData,
      'verseStatus',
      new VerseStatusSerializer(),
      new VerseStatusDeserializer()
    ),
    new SyncRepository(new PouchRepository<InboxCard>(
      userData,
      'inbox',
      new InboxCardSerializer(),
      new InboxCardDeserializer()
    )),
    new SyncRepository(new PouchRepository<ReviewCard>(
      userData,
      'review',
      new ReviewCardSerializer(),
      new ReviewCardDeserializer()
    )),
  )
  return {
    app: new Application(repositories),
  }
}