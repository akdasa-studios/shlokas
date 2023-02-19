import { App } from '@capacitor/app'
import { Emitter } from 'mitt'
import { Events } from '@/app/Events'
import { InitArgs } from '../initialization'


export async function initAppStateChange(
  { get }: InitArgs
) {
  const emitter = get<Emitter<Events>>('emitter')
  App.addListener('appStateChange', async ({ isActive }) => {
    emitter.emit('appStateChanged', { isActive: isActive })
  })
}
