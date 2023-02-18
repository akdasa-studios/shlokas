import { Emitter } from 'mitt'
import { Events } from '@/app/Events'
import { InitArgs, InitStageResult } from '../initialization'


export async function initCommands(
  { shlokas, get }: InitArgs
): Promise<InitStageResult> {
  const emitter = get<Emitter<Events>>('emitter')
  shlokas.processor.commandExecuted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  shlokas.processor.commandReverted.subscribe((cmd: any) => emitter.emit('commandExecuted', cmd))
  return {}
}
