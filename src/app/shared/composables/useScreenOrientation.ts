import { ScreenOrientation } from '@capacitor/screen-orientation'
import { computed, ref } from 'vue'


export function useScreenOrientation() {

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const type = ref('portrait')
  const isLocked = ref(false)

  const isPortrait = computed(() => [
    'portrait', 'portrait-primary', 'portrait-secondary'
  ].includes(type.value))


  /* -------------------------------------------------------------------------- */
  /*                                    Setup                                   */
  /* -------------------------------------------------------------------------- */

  ScreenOrientation.addListener(
    'screenOrientationChange',
    (r) => type.value = isLocked.value ? type.value : r.type
  )


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function orientation() {
    return (await ScreenOrientation.orientation()).type
  }

  async function lock(orientation: OrientationLockType) {
    type.value = orientation
    isLocked.value = true
    try {
      await ScreenOrientation.lock({ orientation: orientation })
    } catch { /* skip */ }
  }

  async function unlock() {
    isLocked.value = false
    try {
      await ScreenOrientation.unlock()
    } catch { /* skip */ }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { orientation, lock, unlock, isPortrait }
}