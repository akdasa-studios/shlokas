import { InMemoryRepository } from '@akdasa-studios/framework'
import { Application, InboxCard, Language, Repositories, ReviewCard, Translation, Verse, VerseBuilder, VerseId, VerseNumber, VerseStatus, Text } from "@akdasa-studios/shlokas-core"
import { Storage } from '@ionic/storage'
import { App } from '@capacitor/app'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { InboxCardDeserializer, InboxCardSerializer } from '@/services/persistence/InboxCardSerializer'
import { CouchDB, PouchRepository } from "@/services/persistence/PouchRepository"
import { ReviewCardDeserializer, ReviewCardSerializer } from '@/services/persistence/ReviewCardSerializer'
import { VerseStatusDeserializer, VerseStatusSerializer } from '@/services/persistence/VerseStatusSerializer'

import versesRu from '../verses.ru.json'
import versesEn from '../verses.en.json'
import { useAccountStore } from './settings/stores/useAccountStore'
import { useDeviceStore } from './useDeviceStorage'

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
    ? "local-" + new Date().toISOString() // create new DB every page refresh
    // ? "http://admin:12345678@localhost:5984/test123"
    : "local"
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

  /* -------------------------------------------------------------------------- */
  /*                             Sync in background                             */
  /* -------------------------------------------------------------------------- */

  App.addListener('appStateChange', async ({ isActive }) => {
    if (isActive) { return }
    const account = useAccountStore()

    const taskId = await BackgroundTask.beforeExit(async () => {
      if (account.syncHost.value) {
        await couchDB.sync(account.syncHost.value)
      }
      BackgroundTask.finish({ taskId })
    })
  })

  return application
}
