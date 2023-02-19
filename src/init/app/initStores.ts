import { Emitter } from 'mitt'
import { useDeviceStore } from '@/app/useDeviceStorage'
import { useAccountStore, useAppearanceStore, useLocaleStore } from '@/app/settings'
import { useTutorialStore } from '@/app/decks/shared'
import { runSyncInboxDeckTask } from '@/app/decks/inbox'
import { Events } from '@/app/Events'
import { InitArgs } from '../initialization'

export async function initStores(
  { shlokas, get }: InitArgs
) {
  const storage = useDeviceStore()
  const emitter = get('emitter') as Emitter<Events>
  storage.init(get('deviceStorage'))

  await Promise.all([
    useLocaleStore().load(),
    useAccountStore().load(),
    useAppearanceStore().load(),
    useTutorialStore().load(),
  ])

  runSyncInboxDeckTask(shlokas, emitter)
}
