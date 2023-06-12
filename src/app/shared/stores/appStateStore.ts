import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Global app state.
 */
export const useAppStateStore = defineStore('appState', () => {
  /**
   * If true, the app is in fullscreen mode, otherwise not. In fullscreen mode,
   * the status bar and navigation bar are hidden.
   */
  const fullscreen = ref(false)

  /**
   * The name of the current route.
   */
  const routeName = ref('')


  return { fullscreen, routeName }
})