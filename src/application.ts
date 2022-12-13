import { Application, Translation, Verse, VerseBuilder, Text, VerseNumber } from '@akdasa-studios/shlokas-core'
import { InMemoryRepository } from '@akdasa-studios/framework'

const versesRepo = new InMemoryRepository<Verse>()

versesRepo.save(new VerseBuilder()
  .withNumber(new VerseNumber('BG 1.1'))
  .withText(new Text([
    'dhṛtarāṣṭra uvāca',
    'dharma-kṣetre kuru-kṣetre',
    'samavetā yuyutsavaḥ',
    'māmakāḥ pāṇḍavāś caiva',
    'kim akurvata sañjaya',
  ]))
  .withTranslation(new Translation(
    'Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra, desiring to fight, what did they do?'
  ))
  .build().value)

versesRepo.save(new VerseBuilder()
  .withNumber(new VerseNumber('BG 1.2'))
  .withText(new Text([
    'sañjaya uvāca',
    'dṛṣṭvā tu pāṇḍavānīkaṁ',
    'vyūḍhaṁ duryodhanas tadā',
    'ācāryam upasaṅgamya',
    'rājā vacanam abravīt',
  ]))
  .withTranslation(new Translation(
    'Sañjaya said: O King, after looking over the army arranged in military formation by the sons of Pāṇḍu, King Duryodhana went to his teacher and spoke the following words.'
  ))
  .build().value)

const app = new Application(versesRepo)

export function useApp() : Application { return app }