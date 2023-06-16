import { App } from '@capacitor/app'
import { useAppStateStore, useEmitter } from '@/app/shared'


export async function initAppStateChange() {
  const appStateStore = useAppStateStore()

  const emitter = useEmitter()
  App.addListener('appStateChange', async ({ isActive }) => {
    appStateStore.isActive = isActive

    emitter.emit('appStateChanged', { isActive: isActive })
  })
}
