import { Application } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'

import { InitArgs, InitResult } from '../initialization'


export async function initCommands(
  { get }: InitArgs
): Promise<InitResult> {
  const emitter = get<EventEmitter2>('emitter')
  const shlokas = get<Application>('app')
  shlokas.commandExecuted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  shlokas.commandReverted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  return {}
}
