import { useAccountStore, useSettingsStore } from '@/app/settings'
import { useDeviceStore } from '@/app/shared'
import { InitArgs } from '../initialization'

export async function initStores(
  { get }: InitArgs
) {
  const storage = useDeviceStore()
  storage.init(get('deviceStorage'))

  await Promise.all([
    useSettingsStore().load(),
    useAccountStore().load(),
  ])
}
