
import { Translation, VerseBuilder, VerseId, VerseNumber, Text, Language, Application } from '@akdasa-studios/shlokas-core'
import { InitArgs } from '../initialization'
import { CouchDB } from './../../services/persistence/PouchRepository'

export async function initStaticData(
  { get }: InitArgs
) {
  const shlokas = get<Application>('app')
  const db: CouchDB = get('verses')
  const docs: any = await db.db.find({ selector: { '@type': 'verse' }})

  for (const verse of docs.docs) {
    const builder = new VerseBuilder()
      .ofLanguage(new Language(verse.language, verse.language))
      .withId(new VerseId(verse._id))
      .withNumber(new VerseNumber(verse.number))
      .withText(new Text(verse.text))
      .withTranslation(new Translation(verse.translation))
      .withTextAudioUri(verse.textAudioUri)
      .withTextImageUri(verse.textImageUri)

    for (const w of verse.synonyms) {
      builder.withSynonym(w.words.join(' '), w.translation)
    }

    await shlokas.repositories.verses.save(builder.build().value)
  }
}
