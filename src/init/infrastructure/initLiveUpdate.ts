import { Deploy } from 'cordova-plugin-ionic'
import { Capacitor } from '@capacitor/core'
import { useEnv } from '@/app/shared'


/**
 * Initialize logging system
 */
export async function initLiveUpdate() {
  const env = useEnv()

  // Live update is not supported in web
  if (Capacitor.getPlatform() === 'web') { return }

  // Live update is not supported in development
  if (env.isDevelopment()) {
    await Deploy.configure({
      channel: 'Production',
      updateMethod: 'none',
    })
  }
}

