import { Storage } from '@ionic/storage'
import { useDeviceStore } from '@/app/shared'
import { InitResult } from '../initialization'

/**
 * Initialize the device storage
 */
export async function initDeviceStorage(): Promise<InitResult> {
  const deviceStorage = await new Storage().create()
  const storage = useDeviceStore()
  storage.init(deviceStorage)
  return { deviceStorage }
}