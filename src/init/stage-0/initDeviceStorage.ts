import { Storage } from '@ionic/storage'
import { InitStageResult } from '../initialization'

/**
 * Initialize the device storage to keep user settings
 */
export async function initDeviceStorage(): Promise<InitStageResult> {
  const deviceStorage = new Storage()
  await deviceStorage.create()
  return { deviceStorage }
}