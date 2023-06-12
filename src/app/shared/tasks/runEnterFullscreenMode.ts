// import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { StatusBar } from '@capacitor/status-bar'
import { useScreenOrientation } from '../composables/useScreenOrientation'

export function runEnterFullscreenMode() {

  const screenOrientation = useScreenOrientation()
  // const route = useRoute()

  watch(screenOrientation.isPortrait, onScreenOrientatonChanged)

  async function onScreenOrientatonChanged() {
    if (!screenOrientation.isPortrait) {
      await StatusBar.hide()
    } else {
      await StatusBar.show()
    }
  }
}