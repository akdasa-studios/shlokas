import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, UpdateVerseStatus } from '@akdasa-studios/shlokas-core'
import { ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { VerseViewModel } from '@/app/library'
import { shlokas } from '@/application'


export class VerseDialogViewModel extends ViewModel {
  public verse: VerseViewModel = VerseViewModel.empty
  public readonly isOpen = ref(false)

  open(verse: VerseViewModel) {
    this.verse = verse
    this.isOpen.value = true
  }

  async addVerseToInbox() {
    const transaction = new Transaction()
    await shlokas.execute(new AddVerseToInboxDeck(this.verse.verseId.value), transaction)
    await shlokas.execute(new UpdateVerseStatus(this.verse.verseId.value), transaction)
  }

  close() {
    this.isOpen.value = false
  }
}
