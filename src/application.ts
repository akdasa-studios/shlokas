import { InMemoryRepository } from '@akdasa-studios/framework'
import { Application, InboxCard, Language, Repositories, ReviewCard, Text, Translation, Verse, VerseBuilder, VerseId, VerseNumber, VerseStatus } from '@akdasa-studios/shlokas-core'
import { ApplicationViewModel } from '@/app/ApplicationViewModel'
import { VerseStatusDeserializer, VerseStatusSerializer } from "@/services/persistence/VerseStatusSerializer"
import { InboxCardDeserializer, InboxCardSerializer } from './services/persistence/InboxCardSerializer'
import { CouchDB, PouchRepository } from './services/persistence/PouchRepository'
import { ReviewCardDeserializer, ReviewCardSerializer } from './services/persistence/ReviewCardSerializer'
import { verses } from './verses'

const versesRepo = new InMemoryRepository<Verse>()
const english = new Language('en', 'English')
const russian = new Language('ru', 'Русский')


for (const verse of verses) {
  const builder = new VerseBuilder()
    .ofLanguage(russian)
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
  versesRepo.save(builder.build().value)
}

versesRepo.save(new VerseBuilder()
  .ofLanguage(english)
  .withId(new VerseId("b2b56240-c6e3-4290-92b9-007f1b00c4ee"))
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
  .withId(new VerseId("8c557554-cd1f-4d12-b5cd-6a2b193aff3e"))
  .ofLanguage(english)
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

versesRepo.save(new VerseBuilder()
  .withId(new VerseId("25253153-e2cb-45b9-9337-1a0c9d06be35"))
  .ofLanguage(english)
  .withNumber(new VerseNumber('BG 2.12'))
  .withText(new Text([
    'na tv evāhaṁ jātu nāsaṁ',
    'na tvaṁ neme janādhipāḥ',
    'na caiva na bhaviṣyāmaḥ',
    'sarve vayam ataḥ param'
  ]))
  .withTranslation(new Translation(
    'Never was there a time when I did not exist, nor you, nor all these kings; nor in the future shall any of us cease to be.'
  ))
  .build().value)

versesRepo.save(new VerseBuilder()
  .withId(new VerseId("9dda803e-2070-4c8c-a010-0a83fd4d0baf"))
  .ofLanguage(english)
  .withNumber(new VerseNumber('BG 2.13'))
  .withText(new Text([
    'dehino ’smin yathā dehe',
    'kaumāraṁ yauvanaṁ jarā',
    'tathā dehāntara-prāptir',
    'dhīras tatra na muhyati'
  ]))
  .withTranslation(new Translation(
    'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.'
  ))
  .build().value)

versesRepo.save(new VerseBuilder()
  .withId(new VerseId("196aa958-8c65-43b0-a94d-93d2fc5fcb3b"))
  .ofLanguage(english)
  .withNumber(new VerseNumber('BG 2.20'))
  .withText(new Text([
    'na jāyate mriyate vā kadācin',
    'nāyaṁ bhūtvā bhavitā vā na bhūyaḥ',
    'ajo nityaḥ śāśvato ’yaṁ purāṇo',
    'na hanyate hanyamāne śarīre',
  ]))
  .withTranslation(new Translation(
    'For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing and primeval. He is not slain when the body is slain.'
  ))
  .build().value)

versesRepo.save(new VerseBuilder()
  .withId(new VerseId("65130e7b-e9a7-4298-87a4-a498138ef1f2"))
  .ofLanguage(english)
  .withNumber(new VerseNumber('BG 2.22'))
  .withText(new Text([
    'vāsāṁsi jīrṇāni yathā vihāya',
    'navāni gṛhṇāti naro ’parāṇi',
    'tathā śarīrāṇi vihāya jīrṇāny',
    'anyāni saṁyāti navāni dehī'
  ]))
  .withTranslation(new Translation(
    'As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.'
  ))
  .build().value)


versesRepo.save(new VerseBuilder()
  .withId(new VerseId("a0ca66f1-eeff-4842-945c-49e2fc50fbe9"))
  .ofLanguage(english)
  .withNumber(new VerseNumber('BG 2.41'))
  .withText(new Text([
    'vyavasāyātmikā buddhir',
    'ekeha kuru-nandana',
    'bahu-śākhā hy anantāś ca',
    'buddhayo ’vyavasāyinām',
  ]))
  .withTranslation(new Translation(
    'Those who are on this path are resolute in purpose, and their aim is one. O beloved child of the Kurus, the intelligence of those who are irresolute is many-branched.'
  ))
  .build().value)

versesRepo.save(new VerseBuilder()
  .withId(new VerseId("02144cf0-a94c-4007-976f-afc9d6f0fba3"))
  .ofLanguage(english)
  .withNumber(new VerseNumber('BG 2.44'))
  .withText(new Text([
    'bhogaiśvarya-prasaktānāṁ',
    'tayāpahṛta-cetasām',
    'vyavasāyātmikā buddhiḥ',
    'samādhau na vidhīyate',
  ]))
  .withTranslation(new Translation(
    'In the minds of those who are too attached to sense enjoyment and material opulence, and who are bewildered by such things, the resolute determination for devotional service to the Supreme Lord does not take place.'
  ))
  .build().value)



const dev = process.env.NODE_ENV === "development"

export const couchDB = new CouchDB(
  dev
  ? "local " // + new Date().toISOString() // create new DB every page refresh
  : "local"
)
export const repositories = new Repositories(
  versesRepo,
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

// @ts-ignore
window.shlokas = shlokas
