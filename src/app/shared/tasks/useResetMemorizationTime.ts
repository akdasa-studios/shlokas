import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useAppStateStore, useApplication } from '@/app/shared'


export function useResetMemorizationTime() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const app           = useApplication()
  const appStateStore = useAppStateStore()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { isActive } = storeToRefs(appStateStore)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function run() {
    watch([
      isActive, app.now
    ], reset)
    reset()
  }


  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  async function reset() {
    const lastResetAt = appStateStore.memorizationTimeResetAt
    const now         = app.now.value
    const today       = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`

    if (lastResetAt !== today) {
      appStateStore.memorizationTimeSpend = 0
      appStateStore.memorizationTimeResetAt = today
    }
  }

  return { run }
}