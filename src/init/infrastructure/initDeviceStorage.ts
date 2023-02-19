import { Storage } from '@ionic/storage'
import { InitResult } from '../initialization'

/**
 * Initialize the device storage to keep user settings
 */
export async function initDeviceStorage(): Promise<InitResult> {
  return { deviceStorage: await new Storage().create() }
}