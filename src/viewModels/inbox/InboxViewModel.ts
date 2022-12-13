import { ref } from 'vue'
import { AddVerseToInboxDeck, Application, VerseId } from '@akdasa-studios/shlokas-core'
import { InboxCard } from '@akdasa-studios/shlokas-core'
import { InboxCardVewModel } from './InboxCardVewModel'


export class InboxViewModel {
  public cards = ref<InboxCardVewModel[]>([])

  constructor(private readonly app: Application) {
  }

  addVerse(verseId: VerseId) {
    this.app.processor.execute(new AddVerseToInboxDeck(verseId))
    this.sync()
  }

  public sync() {
    const getVerse = (verseId: VerseId) => {
      const result = this.app.library.getById(verseId)
      return result.value
    }
    const inboxCards = this.app.inboxDeck.cards
    this.cards.value = inboxCards.map(
      (card: InboxCard) => new InboxCardVewModel(this.app, card, getVerse(card.verseId), () => this.sync())
    )
  }
}