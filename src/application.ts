import { InMemoryRepository } from '@akdasa-studios/framework'
import { Application, InboxCard, Language, Repositories, ReviewCard, Text, Translation, Verse, VerseBuilder, VerseId, VerseNumber, VerseStatus } from '@akdasa-studios/shlokas-core'
import { App } from '@capacitor/app'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { ApplicationViewModel } from '@/app/ApplicationViewModel'
import { VerseStatusDeserializer, VerseStatusSerializer } from "@/services/persistence/VerseStatusSerializer"
import { InboxCardDeserializer, InboxCardSerializer } from './services/persistence/InboxCardSerializer'
import { CouchDB, PouchRepository } from './services/persistence/PouchRepository'
import { ReviewCardDeserializer, ReviewCardSerializer } from './services/persistence/ReviewCardSerializer'


import versesRu from './verses.ru.json'
import versesEn from './verses.en.json'


const dev = process.env.NODE_ENV === "development"

export const couchDB = new CouchDB(
  dev
  ? "local"// +new Date().toISOString() // create new DB every page refresh
  // ? "http://admin:12345678@localhost:5984/test123"
  : "local"
)

export const repositories = new Repositories(
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

export const app = new Application(repositories)
export const shlokas = new ApplicationViewModel(app)

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



App.addListener('appStateChange', async ({ isActive }) => {
  if (isActive) {
    return
  }
  // The app state has been changed to inactive.
  // Start the background task by calling `beforeExit`.
  const taskId = await BackgroundTask.beforeExit(async () => {
    if (shlokas.settings.dbConnectionString.value) {
      await couchDB.sync(shlokas.settings.dbConnectionString.value)
    }
    BackgroundTask.finish({ taskId })
  })
})
