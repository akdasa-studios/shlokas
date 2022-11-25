import { VerseTransliteration } from '@/models/verse'

describe('VerseTransliteration', () => {
  describe('constructor', () => {
    it('should throw an error if lines is empty', () => {
      expect(() => new VerseTransliteration([])).toThrowError('lines must contain at least one line')
    })

    it('should throw an error if lines contains empty lines', () => {
      expect(() => new VerseTransliteration(['', 'line2'])).toThrowError('lines must not contain empty values')
    })

    it('should create a new instance of VerseTransliteration class', () => {
      expect(new VerseTransliteration(['line1'])).toBeInstanceOf(VerseTransliteration)
    })

    it('should set the lines property', () => {
      expect(new VerseTransliteration(['line1']).lines).toEqual(['line1'])
    })
  })
})