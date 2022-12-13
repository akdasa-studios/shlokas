import { Application, Translation, Verse, VerseBuilder, Text, VerseNumber } from '@akdasa-studios/shlokas-core'
import { InMemoryRepository } from '@akdasa-studios/framework'

const versesRepo = new InMemoryRepository<Verse>()
const verse1 = new VerseBuilder()
  .withNumber(new VerseNumber('BG 1.1'))
  .withText(new Text(['1.1']))
  .withTranslation(new Translation('1.1'))
  .build().value
const verse2 = new VerseBuilder()
  .withNumber(new VerseNumber('BG 1.2'))
  .withText(new Text(['1.2']))
  .withTranslation(new Translation('1.2'))
  .build().value

versesRepo.save(verse1)
versesRepo.save(verse2)

const app = new Application(versesRepo)

export function useApp() : Application { return app }
export const verses: Verse[] = [verse1, verse2]