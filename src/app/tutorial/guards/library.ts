import { Verse } from '@akdasa-studios/shlokas-core'
import { TutorialSteps, useTutorialStore } from '@/app/tutorial'

/**
 * Checks if a user is allowed to add verse
 * @param verse Verse to check
 * @returns True if a user is allowed to add verse
 */
export function canUserAddVerse(
  verse: Verse
) {
  const allowedVerseReference = 'BG 1.1'
  const tutorial = useTutorialStore()

  if (!tutorial.inProgress) { return true }

  const isAllowedVerse = verse.reference == allowedVerseReference
  const isAllowedToAddVerses = [
    TutorialSteps.LibraryOpenVerse, TutorialSteps.LibraryAddVerse
  ].includes(tutorial.currentStep)

  if (!isAllowedVerse) { tutorial.invalidAction(); return false }
  if (!isAllowedToAddVerses) { tutorial.invalidAction(); return false }

  return true
}
