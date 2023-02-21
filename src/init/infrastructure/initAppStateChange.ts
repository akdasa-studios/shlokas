import { App } from '@capacitor/app'
import { EventEmitter2 } from 'eventemitter2'
import { InitArgs } from '../initialization'


export async function initAppStateChange(
  { get }: InitArgs
) {
  const emitter = get<EventEmitter2>('emitter')
  App.addListener('appStateChange', async ({ isActive }) => {
    emitter.emit('appStateChanged', { isActive: isActive })
  })
}
