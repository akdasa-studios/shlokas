import { Command, AnyResult } from '@akdasa-studios/framework'

export type Events = {
  commandExecuted: Command<unknown, AnyResult>
  syncCompleted: void,
  appStateChanged: { isActive: boolean }
}