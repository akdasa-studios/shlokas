// import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { StatusBar } from '@capacitor/status-bar'
import { useScreenOrientation } from '../composables/useScreenOrientation'

export function runEnterFullscreenMode() {

  const screenOrientation = useScreenOrientation()
  // const route = useRoute()

  watch(screenOrientation.isPortrait, onScreenOrientatonChanged)

  async function onScreenOrientatonChanged() {
    alert('Changing')
    if (!screenOrientation.isPortrait.value) {
      await StatusBar.hide()
      alert('Done')
    } else {
      await StatusBar.show()
    }
  }
}