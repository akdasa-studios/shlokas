import { App } from '@capacitor/app'
import { useEmitter } from '@/app/shared'


export async function initAppStateChange() {
  const emitter = useEmitter()
  App.addListener('appStateChange', async ({ isActive }) => {
    emitter.emit('appStateChanged', { isActive: isActive })
  })
}
