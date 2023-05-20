import { Application } from '@akdasa-studios/shlokas-core'

import { useEmitter } from '@/app/shared'
import { InitArgs, InitResult } from '../initialization'


export async function initCommands(
  { get }: InitArgs
): Promise<InitResult> {
  const emitter = useEmitter()

  const shlokas = get<Application>('app')
  shlokas.commandExecuted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  shlokas.commandReverted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  return {}
}
