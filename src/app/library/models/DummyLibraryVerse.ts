import { Text, Translation, VerseBuilder, VerseId, VerseNumber, VerseStatus, VerseStatusId } from "@akdasa-studios/shlokas-core"
import { ref } from "vue"
import { LibraryVerse } from "./LibraryVerse"

const dummyVerse = new VerseBuilder()
  .withId(new VerseId('00000000-0000-0000-0000-000000000000'))
  .withNumber(new VerseNumber('????'))
  .withText(new Text(['????']))
  .withTranslation(new Translation('????'))
  .build().value
const dummyVerseStatus = new VerseStatus(
  new VerseStatusId('00000000-0000-0000-0000-000000000000'),
  dummyVerse.id
)

export const DummyLibraryVerse = new LibraryVerse(
  //@ts-ignore
  dummyVerse, ref(dummyVerseStatus)
)
