import { InMemoryRepository } from '@akdasa-studios/framework'
import { SyncRepository } from '@akdasa-studios/framework-sync'
import { Application, Context, Declamation, InboxCard, Repositories, ReviewCard, TimeMachine, Verse, VerseImage, VerseStatus } from '@akdasa-studios/shlokas-core'
import { useApplication } from '@/app/shared'
import {
  CouchDB, InboxCardDeserializer,
  InboxCardSerializer, PouchRepository, ReviewCardDeserializer,
  ReviewCardSerializer, VerseStatusDeserializer, VerseStatusSerializer,
  VerseImageSerializer, VerseImageDeserializer, DeclamationSerializer,
  DeclamationDeserializer
} from '@/services/persistence'
import { InitArgs, InitResult } from '../initialization'

/**
 * Initialize app
 */
export async function initShlokasApp(
  { get }: InitArgs
): Promise<InitResult> {
  const app = useApplication()

  const userData = get<CouchDB>('userData')
  const userDataTutorial = get<CouchDB>('userDataTutorial')

  // static data repos
  const verses = get<CouchDB>('verses')
  const versesRepo = new InMemoryRepository<Verse>()
  const verseImagesRepo = new PouchRepository<VerseImage>(
    verses,
    'verseImage',
    new VerseImageSerializer(),
    new VerseImageDeserializer()
  )
  const declamationsRepo = new PouchRepository<Declamation>(
    verses,
    'declamation',
    new DeclamationSerializer(),
    new DeclamationDeserializer()
  )


  // main context repos
  const mainContextRepositories = new Repositories(
    versesRepo,
    verseImagesRepo,
    declamationsRepo,
    // @ts-ignore
    new SyncRepository(new PouchRepository<VerseStatus>(
      userData,
      'verseStatus',
      new VerseStatusSerializer(),
      new VerseStatusDeserializer()
    )),
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


  // main context repos
  const tutorialContextRepositories = new Repositories(
    versesRepo,
    verseImagesRepo,
    declamationsRepo,
    // @ts-ignore
    new PouchRepository<VerseStatus>(
      userDataTutorial,
      'verseStatus',
      new VerseStatusSerializer(),
      new VerseStatusDeserializer()
    ),
    new SyncRepository(new PouchRepository<InboxCard>(
      userDataTutorial,
      'inbox',
      new InboxCardSerializer(),
      new InboxCardDeserializer()
    )),
    new SyncRepository(new PouchRepository<ReviewCard>(
      userDataTutorial,
      'review',
      new ReviewCardSerializer(),
      new ReviewCardDeserializer()
    )),
  )

  const mainContext = new Context(
    'main',
    new TimeMachine(),
    mainContextRepositories
  )

  const tutorialContext = new Context(
    'tutorial',
    new TimeMachine(),
    tutorialContextRepositories
  )

  const appInstance = new Application(mainContext)
  app.init(appInstance)
  app.registerContext(mainContext)
  app.registerContext(tutorialContext)

  return { app: appInstance }
}