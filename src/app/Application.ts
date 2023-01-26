import { InMemoryRepository } from '@akdasa-studios/framework'
import { Application, InboxCard, Language, Repositories, ReviewCard, Translation, Verse, VerseBuilder, VerseId, VerseNumber, VerseStatus, Text, UpdateVerseStatus } from "@akdasa-studios/shlokas-core"
import { Storage } from '@ionic/storage'
import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { useLibraryStore } from '@/app/library'
import { useInboxDeckStore } from '@/app/decks/inbox'
import { useReviewDeckStore } from '@/app/decks/review'
import { InboxCardDeserializer, InboxCardSerializer } from '@/services/persistence/InboxCardSerializer'
import { CouchDB, PouchRepository } from "@/services/persistence/PouchRepository"
import { ReviewCardDeserializer, ReviewCardSerializer } from '@/services/persistence/ReviewCardSerializer'
import { VerseStatusDeserializer, VerseStatusSerializer } from '@/services/persistence/VerseStatusSerializer'

import { AuthService } from '@/services/AuthService'
import versesRu from '../verses.ru.json'
import versesEn from '../verses.en.json'
import { CardMemorizationUseCase } from './decks/inbox/useCases/CardMemorizationUseCase'
import { useAppearanceStore } from './settings/stores/useAppearanceStore'
import { useAccountStore } from './settings/stores/useAccountStore'
import { useDeviceStore } from './useDeviceStorage'
import { AUTH_HOST } from './Env'

export let application: Application
export let couchDB: CouchDB

export async function createApplication() {
  const dev = process.env.NODE_ENV === "development"

  const deviceStorage = new Storage()
  await deviceStorage.create()
  const storage = useDeviceStore()
  storage.init(deviceStorage)

  couchDB = new CouchDB(
    dev
    ? "local" //+ new Date().toISOString() // create new DB every page refresh
    // ? "http://admin:12345678@localhost:5984/test123"
    : "local",
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

  loadVerses(new Language('ru', 'Русский'), versesRu)
  loadVerses(new Language('en', 'English'), versesEn)

  function loadVerses(lang: Language, verses: any[]) {
    for (const verse of verses) {
      const builder = new VerseBuilder()
        .ofLanguage(lang)
        .withId(new VerseId(verse.uuid))
        .withNumber(new VerseNumber(verse.number))
        .withText(new Text(verse.text))
        .withTranslation(new Translation(verse.translation))

      for (const w of verse.synonyms) {
        builder.withSynonym(
          w.words.join(' '),
          w.translation
          )
        }
        repositories.verses.save(builder.build().value)
      }
  }

  application = new Application(repositories)

  await loadState()
  async function loadState() {
    await Promise.all([
      useAccountStore().load(),
      useAppearanceStore().load(),
      // await new UserMemorizingCardsScenario(app).open()
      // useInboxDeckStore(application).refresh(),
      useReviewDeckStore(application).refresh(),
    ])
  }
  /* -------------------------------------------------------------------------- */
  /*                             Sync in background                             */
  /* -------------------------------------------------------------------------- */

  App.addListener('appStateChange', async ({ isActive }) => {
    if (!isActive) { return }
    await loadState()
  })

  if (Capacitor.getPlatform() == 'ios') {
    // beforeExit works on iOS only
    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) { return }
      const taskId = await BackgroundTask.beforeExit(async () => {
        const account = useAccountStore()
        if (!account?.token) { return }

        if (new Date().getTime() >= account.token.expires) {
          // refresh token
          const service = new AuthService(AUTH_HOST)
          account.token.expires = (await service.refreshToken(account.token)).expires
        } else if (account.syncHost?.value) {
          // sync db
          await couchDB.sync(account.syncHost.value)
        }
        BackgroundTask.finish({ taskId })
      })
    })
  }
  return application
}
