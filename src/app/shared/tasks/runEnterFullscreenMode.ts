import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/app/settings'
import { useScreenOrientation } from '../composables/useScreenOrientation'
import { useAppStateStore } from '../stores/appStateStore'


/**
 * Enter fullscreen mode when in landscape mode and hide controls is enabled.
 */
export function runEnterFullscreenMode() {
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
  /*                                    Init                                    */
  /* -------------------------------------------------------------------------- */

  watch(
    [screenOrientation.isPortrait, routeName],
    onChanged
  )


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onChanged() {
    const isLandscape = !screenOrientation.isPortrait.value
    const isFullscreenEligible = fullscrenEligibleRoutes.includes(routeName.value)
    const hideControls = hideControlsInLandscapeMode.value
    appStateStore.fullscreen = isLandscape && isFullscreenEligible && hideControls
  }
}