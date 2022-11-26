import { InboxDeck } from '@/models/decks'
import { VerseId } from '@/models/verse'
import { InboxCardBuilder } from "@/models/cards"
import { InboxCardType } from '@/models/cards'


describe('InboxDeck', () => {

  let deck: InboxDeck
  const b = (
    new InboxCardBuilder()
      .ofVerse(new VerseId())
      .ofType(InboxCardType.Transliteration)
  )

  beforeEach(() => {
    deck = new InboxDeck([])
  })

  /* -------------------------------------------------------------------------- */
  /*                                    cards                                   */
  /* -------------------------------------------------------------------------- */

  describe('.cards', () => {
    it('sorts cards by addedAt', () => {
      const card1 = b.addedAt(new Date(2020, 1, 1)).build()
      const card2 = b.addedAt(new Date(2020, 1, 1, 1, 1, 2)).build()
      const card3 = b.addedAt(new Date(2020, 1, 1, 1, 1, 3)).build()
      const card4 = b.addedAt(new Date(2020, 1, 2)).build()
      const card5 = b.addedAt(new Date(2020, 1, 3)).build()
      const deck = new InboxDeck([card3, card5, card4, card2, card1])
      expect(deck.cards).toEqual([card1, card2, card3, card4, card5])
    })
  })

  /* -------------------------------------------------------------------------- */
  /*                                   addCard                                  */
  /* -------------------------------------------------------------------------- */

  describe('.addCard', () => {
    it('adds cards to the deck', () => {
      const card1 = b.addedAt(new Date(2020, 1, 1)).build()
      deck.addCard(card1)
      expect(deck.cards).toEqual([card1])
    })
  })


  /* -------------------------------------------------------------------------- */
  /*                                  removeCard                                */
  /* -------------------------------------------------------------------------- */

  describe('.removeCard', () => {
    it('removes cards from the deck', () => {
      const card1 = b.addedAt(new Date(2020, 1, 1)).build()
      const card2 = b.addedAt(new Date(2020, 1, 2)).build()
      const deck = new InboxDeck([card1, card2])
      deck.removeCard(card1)
      expect(deck.cards).toEqual([card2])
    })
  })
})