import { Deploy } from 'cordova-plugin-ionic'
import { useEnv } from '@/app/shared'


/**
 * Initialize logging system
 */
export async function initLiveUpdate() {
  const env = useEnv()

  if (env.isDevelopment()) {
    // Do not use live update in development
    await Deploy.configure({
      channel: 'Development',
      updateMethod: 'none'
    })
  }
}

