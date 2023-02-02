import { Storage } from '@ionic/storage'
import { InitStageResult } from '../initialization'

export async function initDeviceStorage(): Promise<InitStageResult> {
  const storage = new Storage()
  await storage.create()
  return { inject: { "deviceStorage": storage } }
}