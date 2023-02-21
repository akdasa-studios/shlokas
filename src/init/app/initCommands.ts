import { EventEmitter2 } from 'eventemitter2'

import { InitArgs, InitResult } from '../initialization'


export async function initCommands(
  { shlokas, get }: InitArgs
): Promise<InitResult> {
  const emitter = get<EventEmitter2>('emitter')
  shlokas.processor.commandExecuted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  shlokas.processor.commandReverted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  return {}
}
