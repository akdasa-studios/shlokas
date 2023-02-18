import { Text, Translation, VerseBuilder, VerseId, VerseNumber, VerseStatus } from '@akdasa-studios/shlokas-core'
import { Ref, ref } from 'vue'
import { LibraryVerse } from './LibraryVerse'

const dummyVerse = new VerseBuilder()
  .withId(new VerseId('00000000-0000-0000-0000-000000000000'))
  .withNumber(new VerseNumber('????'))
  .withText(new Text(['????']))
  .withTranslation(new Translation('????'))
  .build().value
const dummyVerseStatus = new VerseStatus(
  dummyVerse.id
)

export const DummyLibraryVerse = new LibraryVerse(
  dummyVerse, ref(dummyVerseStatus) as Ref<VerseStatus>
)
