import { useDeviceStore } from '@/app/shared'
import { InitArgs } from '../initialization'

export async function initStores(
  { get }: InitArgs
) {
  const storage = useDeviceStore()
  storage.init(get('deviceStorage'))
}
