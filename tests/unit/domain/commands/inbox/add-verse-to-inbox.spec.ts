import { InboxDeck } from "@/models/decks"
import { VerseId } from "@/models/verse"
import { InboxCardType } from '@/models/cards'
import { AddVerseToInbox, InboxContext } from "@/commands/inbox"


describe('AddVerseToInbox', () => {

  /* -------------------------------------------------------------------------- */
  /*                                   Context                                  */
  /* -------------------------------------------------------------------------- */

  let context: InboxContext
  let verseId: VerseId

  beforeEach(() => {
    context = new InboxContext(new InboxDeck([]))
    verseId = new VerseId()
  })


  /* -------------------------------------------------------------------------- */
  /*                                   execute                                  */
  /* -------------------------------------------------------------------------- */

  describe('.execute', () => {
    it('adds translation and transliteration cards to the inbox deck', () => {
      const command = new AddVerseToInbox(verseId)
      const result = command.execute(context)

      expect(result.isSuccess).toBe(true)
      expect(result.value).toHaveLength(2)
      expect(result.value.map(x => x.type)).toEqual([
        InboxCardType.Translation,
        InboxCardType.Transliteration
      ])
      expect(context.deck.cards).toHaveLength(2)
    })
  })


  /* -------------------------------------------------------------------------- */
  /*                                    revert                                  */
  /* -------------------------------------------------------------------------- */

  describe('.revert', () => {
    it('removes added cards', () => {
      const command1 = new AddVerseToInbox(new VerseId())
      const command2 = new AddVerseToInbox(new VerseId())

      const result1 = command1.execute(context)
      const result2 = command2.execute(context)

      command1.revert(context)

      expect(context.deck.cards).toHaveLength(2)
      expect(context.deck.cards).toEqual(result2.value)
      expect(context.deck.cards).not.toContain(result1.value)
    })
  })
})