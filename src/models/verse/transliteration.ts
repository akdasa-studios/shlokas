import { Value } from '@akdasa-studios/framework/domain/models'

/**
 * Verse transliteration
 */
export class Transliteration extends Value<'Transliteration'> {
  /**
   * Initialize a new instance of Transliteration class with the given lines
   */
  constructor (
    public readonly lines: string[],
  ) {
    if (!lines) { throw new Error('lines is required') }
    if (lines.length <= 0) { throw new Error('lines must contain at least one line') }
    if (lines.some((line) => !line)) { throw new Error('lines must not contain empty values') }

    super()
  }
}