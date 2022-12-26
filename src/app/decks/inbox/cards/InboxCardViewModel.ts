import { InboxCard, InboxCardMemorized, Verse } from '@akdasa-studios/shlokas-core'
import { computed, ComputedRef, ref } from 'vue'
import { DomainViewModel, ViewModel } from '@/app/DomainViewModel'
import { shlokas } from '@/application'


export class CardViewModel implements ViewModel {
  public readonly _verse: DomainViewModel<Verse>

  constructor(
    verse: Verse,
  ) {
    this._verse = new DomainViewModel(verse)
  }

  sync(): void {
    this._verse.sync()
  }

  verseNumber: ComputedRef<string> = computed(() => this._verse.ref.value.number.toString())
  text = computed(() => this._verse.ref.value.text.lines)
  translation = computed(() => this._verse.ref.value.translation.text)
  synonyms = computed(() =>  {
    return this._verse.ref.value.synonyms.map(x => ({
      word: x.word,
      translation: x.translation
    }))
  })
}

/**
 * Represents a card in the inbox created from a verse.
 */
export class InboxCardViewModel extends CardViewModel implements ViewModel {
  public readonly _card: DomainViewModel<InboxCard>

  constructor(
    card: InboxCard,
    verse: Verse,
  ) {
    super(verse)
    this._card = new DomainViewModel(card)
  }

  sync(): void {
    super.sync()
    this._card.sync()
  }

  id = computed(() =>  this._card.ref.value.id)
  type = computed(() => this._card.ref.value.type)
  progress = ref<string>("")

  memorized() {
    shlokas.execute(new InboxCardMemorized(this._card.object))
    shlokas.inboxDeck.sync()
    shlokas.reviewDeck.sync()
  }
}
