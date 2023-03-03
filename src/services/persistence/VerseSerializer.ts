import { Result } from '@akdasa-studios/framework'
import { VerseId, Verse, VerseBuilder, VerseNumber, Translation, Text, Language } from '@akdasa-studios/shlokas-core'
import { ObjectMapper } from './ObjectMapper'


export class VerseSerializer implements ObjectMapper<Verse, any> {
  map(from: Verse): Result<any, string> {
    // return Result.ok({
    //   '_id': from.id.value,
    //   '@type': 'verse',
    //   'language': {
    //     'code': from.language.code,
    //     'name': from.language.name
    //   },
    //   'uuid': from.id.value,
    //   'number': from.number.value,
    //   'text': from.text.lines,
    //   'translation': from.translation.text,
    //   'textAudioUri': from.textAudioUri,
    //   'textImageUri': from.textImageUri,
    //   'synonyms': from.synonyms.map(s => ({
    //     'words': s.word.split(' '),
    //     'translation': s.translation
    //   }))
    // })
    throw new Error('Not implemented')
  }
}

export class VerseDeserializer implements ObjectMapper<any, Verse> {
  map(from: any): Result<Verse, string> {
    console.log(from)
    const builder = new VerseBuilder()
      .ofLanguage(new Language(from.language, from.language))
      .withId(new VerseId(from.uuid))
      .withNumber(new VerseNumber(from.number))
      .withText(new Text(from.text))
      .withTranslation(new Translation(from.translation))
      .withTextAudioUri(from.textAudioUri)
      .withTextImageUri(from.textImageUri)

    for (const w of from.synonyms) {
      builder.withSynonym(w.words.join(' '), w.translation)
    }

    return Result.ok(builder.build().value)
  }
}