import { Result } from '@akdasa-studios/framework/core'
import { ICommand } from '@akdasa-studios/framework/commands'

import { VerseId } from '@/models/verse';
import { InboxCard, InboxCardBuilder, InboxCardType } from '@/models/cards'

import { InboxContext } from './inbox-context';


export class AddVerseToInbox implements ICommand<InboxContext, Result<InboxCard[], string>> {
  private _verseId: VerseId
  private _addedCards: InboxCard[] = []

  constructor(verseId: VerseId) {
    this._verseId = verseId
  }

  execute(context: InboxContext): Result<InboxCard[], string> {
    const builder = (
      new InboxCardBuilder()
        .ofVerse(this._verseId)
        .addedAt(new Date())
    )

    // create two cards for the verse
    const card1 = builder.ofType(InboxCardType.Translation).build()
    const card2 = builder.ofType(InboxCardType.Transliteration).build()

    // add the cards to the deck
    context.deck.addCard(card1)
    context.deck.addCard(card2)

    // store the added cards
    this._addedCards = [card1, card2]

    // return the added cards
    return Result.ok(this._addedCards) // TODO: make copy
  }
  revert(context: InboxContext): void {
    for(const card of this._addedCards) {
      context.deck.removeCard(card)
    }
  }
}