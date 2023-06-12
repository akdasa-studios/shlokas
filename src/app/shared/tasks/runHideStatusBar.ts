import { watch } from 'vue'
import { StatusBar } from '@capacitor/status-bar'
import { storeToRefs } from 'pinia'
import { Capacitor } from '@capacitor/core'
import { useAppStateStore } from '../stores/appStateStore'

/**
 * Hide status bar when fullscreen is true, otherwise show it.
 */
export function runHideStatusBar() {
  // Only run on native platforms
  if (Capacitor.getPlatform() === 'web') { return }

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const appStateStore = useAppStateStore()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { fullscreen } = storeToRefs(appStateStore)


  /* -------------------------------------------------------------------------- */
  /*                                    Init                                    */
  /* -------------------------------------------------------------------------- */

  watch(fullscreen, onChanged)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onChanged(value: boolean) {
    if (value) { await StatusBar.hide() } else { await StatusBar.show() }
  }
}