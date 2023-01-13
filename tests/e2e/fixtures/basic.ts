import { ReviewCardBuilder, ReviewCardType, VerseId } from '@akdasa-studios/shlokas-core'

const b = new ReviewCardBuilder()
  .ofVerse(new VerseId("ae78e9f1-e5e9-3650-a90e-e79ccd1eb86c"))
  .addedAt(new Date())
  .dueTo(new Date)

export const reviewCards = [
  b.ofType(ReviewCardType.NumberToTranslation).build(),
  b.ofType(ReviewCardType.NumberToText).build()
]