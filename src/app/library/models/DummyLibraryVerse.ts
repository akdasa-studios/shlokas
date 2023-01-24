import { Translation, VerseBuilder, VerseNumber, VerseStatus, VerseStatusId, Text, VerseId } from "@akdasa-studios/shlokas-core"
import { DomainViewModel } from "@/app/DomainViewModel"
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
  new DomainViewModel(dummyVerse), new DomainViewModel(dummyVerseStatus)
)
