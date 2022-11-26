import { Synonym } from '@/models/verse'

describe('Synonym', () => {
  describe('constructor', () => {
    it('should throw an error if word is empty', () => {
      expect(() => new Synonym('', 'translation')).toThrowError('word is required')
    })

    it('should throw an error if translation is empty', () => {
      expect(() => new Synonym('word', '')).toThrowError('translation is required')
    })

    it('should create a new instance of Synonym class', () => {
      expect(new Synonym('word', 'translation')).toBeInstanceOf(Synonym)
    })

    it('should set the word property', () => {
      expect(new Synonym('word', 'translation').word).toEqual('word')
    })

    it('should set the translation property', () => {
      expect(new Synonym('word', 'translation').translation).toEqual('translation')
    })
  })
})