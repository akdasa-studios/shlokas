import { Language } from '@/models'
import { Verse, VerseId, VerseNumber, Translation, Transliteration, Synonym } from '@/models/verse'

describe('Verse', () => {
  describe('constructor', () => {
    it('should return a new instance of Verse class', () => {
      expect(new Verse(
        new VerseId(),
        new VerseNumber(['BG', '1', '1']),
        new Language('EN', 'English'),
        new Transliteration([
          "dehino ’smin yathā dehe",
          "kaumāraṁ yauvanaṁ jarā",
          "tathā dehāntara-prāptir",
          "dhīras tatra na muhyati"
        ]),
        new Translation(
          'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.'),
        [
          new Synonym('dehinaḥ', 'of the embodied'),
          new Synonym('asmin', 'in this;'),
          new Synonym('yathā', 'as'),
        ]
      )).toBeInstanceOf(Verse)
    })
  })
})