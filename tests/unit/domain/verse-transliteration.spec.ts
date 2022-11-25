import { Transliteration } from '@/models/verse'

describe('Transliteration', () => {
  describe('constructor', () => {
    it('should throw an error if lines is empty', () => {
      expect(() => new Transliteration([])).toThrowError('lines must contain at least one line')
    })

    it('should throw an error if lines contains empty lines', () => {
      expect(() => new Transliteration(['', 'line2'])).toThrowError('lines must not contain empty values')
    })

    it('should create a new instance of Transliteration class', () => {
      expect(new Transliteration(['line1'])).toBeInstanceOf(Transliteration)
    })

    it('should set the lines property', () => {
      expect(new Transliteration(['line1']).lines).toEqual(['line1'])
    })
  })
})