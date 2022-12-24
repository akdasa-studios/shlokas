import { InMemoryRepository } from '@akdasa-studios/framework'
import { Application, InboxCard, Language, Repositories, Text, Translation, Verse, VerseBuilder, VerseNumber, VerseStatus } from '@akdasa-studios/shlokas-core'
import { ApplicationViewModel } from '@/app/ApplicationViewModel'

const versesRepo = new InMemoryRepository<Verse>()
const english = new Language('en', 'English')
const russian = new Language('ru', 'Русский')

versesRepo.save(new VerseBuilder()
  .ofLanguage(russian)
  .withNumber(new VerseNumber('БГ 1.1'))
  .withText(new Text([
    'дхр̣тара̄шт̣ра ува̄ча',
    'дхарма-кшетре куру-кшетре',
    'самавета̄ йуйутсавах̣',
    'ма̄мака̄х̣ па̄н̣д̣ава̄ш́ чаива',
    'ким акурвата сан̃джайа',
  ]))
  .withTranslation(new Translation(
    'Дхритараштра спросил: О Санджая, что стали делать мои сыновья и сыновья Панду, когда, горя желанием вступить в бой, собрались в месте паломничества, на поле Курукшетра?'
  ))
  .build().value)

versesRepo.save(new VerseBuilder()
  .ofLanguage(english)
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

export const repositories = new Repositories(
  versesRepo,
  new InMemoryRepository<VerseStatus>(),
  new InMemoryRepository<InboxCard>()
)
const app = new Application(repositories)

export const root = new ApplicationViewModel(app)
export const library = root.library
export const inbox = root.inbox
export const review = root.review