import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { StatusBar } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'
import { useScreenOrientation , useAppStateStore } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'

/**
 * Enter fullscreen mode when in landscape mode and hide controls is enabled.
 */
export function useEnterFullscreenMode() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const screenOrientation = useScreenOrientation()
  const appStateStore = useAppStateStore()
  const settingsStore = useSettingsStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const fullscrenEligibleRoutes = ['inboxDeck', 'reviewDeck']
  const { routeName } = storeToRefs(appStateStore)
  const { hideControlsInLandscapeMode } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                 Actions                                    */
  /* -------------------------------------------------------------------------- */

  async function run() {
    watch(
      [screenOrientation.isPortrait, routeName],
      onChanged
    )
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onChanged() {
    const isLandscape = !screenOrientation.isPortrait.value
    const isFullscreenEligible = fullscrenEligibleRoutes.includes(routeName.value)
    const hideControls = hideControlsInLandscapeMode.value
    appStateStore.fullscreen = isLandscape && isFullscreenEligible && hideControls

    if (Capacitor.getPlatform() !== 'web') {
      if (appStateStore.fullscreen) { await StatusBar.hide() } else { await StatusBar.show() }
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { run }
}