import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, Application, UpdateVerseStatus, VerseId } from '@akdasa-studios/shlokas-core'
import { Ref, ref } from 'vue'
import { DummyLibraryVerse, LibraryVerse } from '@/app/library'
import { useDialog, useToast } from '@/app/composables'


export function useAddVerse(app: Application) {
  const addedVerseId: Ref<VerseId | undefined> = ref(undefined)
  const toastVerseAdded = useToast()
  const dialogAddVerse = useDialog<LibraryVerse>(DummyLibraryVerse)

  async function addVerseToInbox(verse: LibraryVerse) {
    addedVerseId.value = verse.verseId
    toastVerseAdded.open({data: { verseNumber: verse.number }})
    const transaction = new Transaction()
    await app.processor.execute(new AddVerseToInboxDeck(verse.verseId), transaction)
    await app.processor.execute(new UpdateVerseStatus(verse.verseId), transaction)
  }

  async function revert() {
    if (!addedVerseId.value) { return }
    await app.processor.revert()
  }

  return {
    addVerseToInbox,
    dialogAddVerse,
    toastVerseAdded,
    revert
  }
}