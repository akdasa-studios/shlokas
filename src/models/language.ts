import { Value } from '@akdasa-studios/framework/domain/models'

/**
 * Language
 */
export class Language extends Value<'Language'> {
  /**
   * Initialize a new instance of Language class with the given code and name
   */
  constructor (
    public readonly code: string,
    public readonly name: string,
  ) {
    if (!code) { throw new Error('code is required') }
    if (!name) { throw new Error('name is required') }
    if (code.length < 2) { throw new Error('code must be at least 2 characters long') }
    if (code.length > 5) { throw new Error('code must be at most 5 characters long') }
    super()
  }
}