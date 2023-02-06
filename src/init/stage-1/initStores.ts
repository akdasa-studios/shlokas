import { useDeviceStore } from '@/app/useDeviceStorage'
import { useAccountStore, useAppearanceStore, useLocaleStore } from '@/app/settings'
import { useTutorialStore } from '@/app/decks/shared'
import { InitArgs } from '../initialization'

export async function initStores(
  { get }: InitArgs
) {
  const storage = useDeviceStore()
  storage.init(get("deviceStorage"))

  await Promise.all([
    useLocaleStore().load(),
    useAccountStore().load(),
    useAppearanceStore().load(),
    useTutorialStore().load(),
  ])
}
