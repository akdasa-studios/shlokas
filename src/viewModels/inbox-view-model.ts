import { InboxContext } from '@/commands/inbox';
import { AddVerseToInbox } from '@/commands/inbox';
import { InboxCard } from '@/models/cards';
import { Verse, VerseBuilder, VerseId, VerseNumber } from '@/models/verse';
import { ref } from 'vue';


/**
 * Represents a card in the inbox created from a verse.
 */
export class InboxCardVewModel {
  private _card: InboxCard
  private _verse: Verse

  /**
   * Initializes a new instance of InboxCardVewModel class.
   * @param card Inbox card.
   * @param verse Verse related to the card.
   */
  constructor(card: InboxCard, verse: Verse) {
    this._card = card
    this._verse = verse
  }

  /**
   * Gets id of the card.
   * @returns Id of the card.
   */
  get id(): string {
    return this._card.id.value;
  }

  /**
   * Gets type of the card.
   * @returns Type of the card.
   */
  get type(): string {
    return this._card.type;
  }

  /**
   * Gets string representation of the verse number.
   * @returns String representation of the verse number.
   */
  get verseNumber(): string {
    return this._verse.number.toString()
  }
}

export class InboxViewModel {
  public cards = ref<InboxCardVewModel[]>([])

  constructor(private readonly context: InboxContext) {
  }

  sync() {
    const verse = new VerseBuilder().withNumber(new VerseNumber(["BG", "1", "1"])).build().value
    this.cards.value = this.context.deck.cards.map(card => new InboxCardVewModel(card, verse))
  }

  addVerse(verseId: VerseId) {
    const command = new AddVerseToInbox(verseId)
    command.execute(this.context)
    console.log("Command executed")
    this.sync()
  }
}