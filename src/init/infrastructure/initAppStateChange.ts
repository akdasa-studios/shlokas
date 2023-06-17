import { App } from '@capacitor/app'
import { useAppStateStore } from '@/app/shared'


export async function initAppStateChange() {
  const appStateStore = useAppStateStore()

  App.addListener('appStateChange', async ({ isActive }) => {
    appStateStore.isActive = isActive
  })
}
