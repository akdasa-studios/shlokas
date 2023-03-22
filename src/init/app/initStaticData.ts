
import { Translation, VerseId, VerseNumber, Text, Language, Application, Verse, Synonym } from '@akdasa-studios/shlokas-core'
import { InitArgs } from '../initialization'
import { CouchDB } from './../../services/persistence/PouchRepository'

export async function initStaticData(
  { get }: InitArgs
) {
  const shlokas = get<Application>('app')
  const db: CouchDB = get('verses')
  const docs: any = await db.db.find({ selector: { '@type': 'verse' }})

  for (const verse of docs.docs) {
    const synonyms = []
    for (const w of verse.synonyms) {
      synonyms.push(new Synonym(w.words.join(' '), w.translation, w.lineNumber))
    }

    const v = new Verse(
      new VerseId(verse._id),
      new VerseNumber(verse.number),
      verse.reference,
      new Language(verse.language, verse.language),
      new Text(verse.text),
      new Translation(verse.translation),
      synonyms
    )

    await shlokas.repositories.verses.save(v)
  }
}
