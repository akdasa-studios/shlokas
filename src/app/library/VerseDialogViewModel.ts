import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, UpdateVerseStatus } from '@akdasa-studios/shlokas-core'
import { Ref, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { VerseViewModel } from '@/app/library'
import { shlokas } from '@/application'


export class VerseDialogViewModel extends ViewModel {
  public verse: VerseViewModel = VerseViewModel.empty
  public readonly isOpen: Ref<boolean> = ref(false)

  open(verse: VerseViewModel) {
    this.verse = verse
    this.isOpen.value = true
  }

  addVerseToInbox() {
    const transaction = new Transaction('!!!!') // TODO: remove '!!!!'
    shlokas.execute(new AddVerseToInboxDeck(this.verse.verseId), transaction)
    shlokas.execute(new UpdateVerseStatus(this.verse.verseId), transaction)
  }

  close() {
    this.isOpen.value = false
  }
}
