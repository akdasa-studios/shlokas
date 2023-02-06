
import { Language, Translation, VerseBuilder, VerseId, VerseNumber, Text } from '@akdasa-studios/shlokas-core'
import versesEn from '../../verses.en.json'
import versesRu from '../../verses.ru.json'
import versesUk from '../../verses.uk.json'
import { InitArgs } from '../initialization'

export async function initStaticData(
  { shlokas }: InitArgs
) {
  loadVerses({shlokas}, new Language('ru', 'Русский'), versesRu)
  loadVerses({shlokas}, new Language('en', 'English'), versesEn)
  loadVerses({shlokas}, new Language('uk', 'Українська мова'), versesUk)
}

function loadVerses(
  { shlokas }: Pick<InitArgs, "shlokas">,
  lang: Language,
  verses: any[]
) {
  for (const verse of verses) {
    console.log(verse)
    const builder = new VerseBuilder()
      .ofLanguage(lang)
      .withId(new VerseId(verse.uuid))
      .withNumber(new VerseNumber(verse.number))
      .withText(new Text(verse.text))
      .withTranslation(new Translation(verse.translation))

    for (const w of verse.synonyms) {
      builder.withSynonym(w.words.join(' '), w.translation)
    }

    shlokas.repositories.verses.save(builder.build().value)
  }
}