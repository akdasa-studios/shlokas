import { useDeviceStore } from '@/app/useDeviceStorage'
import { useAccountStore, useAppearanceStore, useLocaleStore } from '@/app/settings'
import { useTutorialStore } from '@/app/decks/shared'
import { useStatisticsStore } from '@/app/statistics'
import { InitArgs } from '../initialization'

export async function initStores(
  { shlokas, get }: InitArgs
) {
  const storage = useDeviceStore()
  storage.init(get("deviceStorage"))

  await Promise.all([
    useLocaleStore().load(),
    useAccountStore().load(),
    useAppearanceStore().load(),
    useTutorialStore().load(),
    useStatisticsStore(shlokas).load(),
  ])
}
