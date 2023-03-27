import { useTutorialStore } from '@/app/decks/shared'
import { useAccountStore, useSettingsStore } from '@/app/settings'
import { useDeviceStore } from '@/app/useDeviceStorage'
import { InitArgs } from '../initialization'

export async function initStores(
  { get }: InitArgs
) {
  const storage = useDeviceStore()
  storage.init(get('deviceStorage'))

  await Promise.all([
    useSettingsStore().load(),
    useAccountStore().load(),
    useTutorialStore().load(),
  ])
}
