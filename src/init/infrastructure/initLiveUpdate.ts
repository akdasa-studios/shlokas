import { Deploy } from 'cordova-plugin-ionic'
import { Capacitor } from '@capacitor/core'
import { useEnv } from '@/app/shared'


/**
 * Initialize live update system
 */
export async function initLiveUpdate() {
  const env = useEnv()

  // Live update is not supported in web or dev
  if (Capacitor.getPlatform() === 'web') { return }

  // Configs for different envs
  const mode =  env.getMode()
  const channels = {
    dev:     { channel: 'Development', updateMethod: 'none' },
    staging: { channel: 'Staging',     updateMethod: 'none' },
    prod:    { channel: 'Production',  updateMethod: 'background' },
  }

  // Live update is not supported in development
  await Deploy.configure({
    appId: '196a538d',
    channel: channels[mode].channel,
    updateMethod: (channels[mode].updateMethod as ('none'|'background')),
  })

}
