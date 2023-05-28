import { Application, Language, Synonym, Text, Translation, Verse, VerseId, VerseNumber } from '@akdasa-studios/shlokas-core'
import { ref } from 'vue'

const inProgress = ref(false)

export function useLoadLibraryIntoMemory(
  app: Application,
  libraryDatabase: any
) {
  async function sync() {
    inProgress.value = true
    try {
      const docs: any = await libraryDatabase.db.find({ selector: { '@type': 'verse' } })

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

        await app.repositories.verses.save(v)
      }
    } finally {
      inProgress.value = false
    }
  }

  return { sync, inProgress }
}
