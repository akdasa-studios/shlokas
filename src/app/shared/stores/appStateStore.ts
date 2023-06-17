import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Global app state.
 */
export const useAppStateStore = defineStore('appState', () => {
  const isActive = ref(true)
  // const appStateChangedAt = ref(0)

  /**
   * If true, the app is in fullscreen mode, otherwise not. In fullscreen mode,
   * the status bar and navigation bar are hidden.
   */
  const fullscreen = ref(false)

  /**
   * The name of the current route.
   */
  const routeName = ref('')


  /**
   * Time spend today on memorization
   */
  const memorizationTimeSpend = ref(0)

  /**
   * Date when memorization time was reset
   */
  const memorizationTimeResetAt = ref('')


  return { fullscreen, routeName, memorizationTimeSpend, memorizationTimeResetAt, isActive }
})