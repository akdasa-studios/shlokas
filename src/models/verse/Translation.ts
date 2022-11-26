import { Value } from '@akdasa-studios/framework/domain/models'

/**
 * Verse translation
 */
export class Translation extends Value<'Translation'> {
  /**
   * Initialize a new instance of Translation class with the given text
   */
  constructor (
    public readonly text: string,
  ) {
    if (!text) { throw new Error('text is required') }
    if (!text.trim()) { throw new Error('text must not be empty') }

    super()
  }
}

export const NoTranslation = new Translation('No Translation')
