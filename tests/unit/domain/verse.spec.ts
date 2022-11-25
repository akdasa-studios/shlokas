import { Language } from '@/models'
import { Verse, VerseId, VerseNumber, Translation, Transliteration, Synonym } from '@/models/verse'

describe('Verse', () => {
  describe('constructor', () => {
    it('should return a new instance of Verse class', () => {
      expect(new Verse(
        new VerseId(),
        new VerseNumber(['1']),
        new Language('EN', 'English'),
        new Transliteration([
          'In the beginning God created the heavens and the earth.',
          'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
        ]),
        new Translation('In the beginning God created the heavens and the earth.'),
        [
          new Synonym('God', 'Allah'),
          new Synonym('heavens', 'sky'),
          new Synonym('earth', 'land'),
        ]
      )).toBeInstanceOf(Verse)
    })
  })
})