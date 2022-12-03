import { ref } from 'vue'

import { VerseBuilder, VerseId, VerseNumber } from '@akdasa-studios/shlokas-core'
import { InboxContext } from '@akdasa-studios/shlokas-core'
import { AddVerseToInboxDeck } from '@akdasa-studios/shlokas-core'

import { InboxCardVewModel } from './InboxCardVewModel'
import { InboxCardMemorized } from '@akdasa-studios/shlokas-core'
import { CardId, InboxCard } from '@akdasa-studios/shlokas-core'


export class InboxViewModel {
  public cards = ref<InboxCardVewModel[]>([])

  constructor(private readonly context: InboxContext) {
  }

  public sync() {
    const verse = new VerseBuilder().withNumber(new VerseNumber(["BG", "1", "1"])).build().value
    this.cards.value = this.context.deck.cards.map((card: InboxCard) => new InboxCardVewModel(this.context, card, verse, () => this.sync()))
  }

  addVerse(verseId: VerseId) {
    const command = new AddVerseToInboxDeck(verseId)
    command.execute(this.context)
    this.sync()
    console.log("synced");
  }

  cardMemorized(cardId: CardId) {
    console.log("memorized")
    const card = this.context.deck.cards.find((card: { id: { value: string } }) => card.id.value === cardId.value)

    const command = new InboxCardMemorized(card as InboxCard)
    console.log("executed", cardId.value)
    command.execute(this.context)
    this.sync()
  }
}