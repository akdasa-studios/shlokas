import { useAppStateStore } from '@/app/shared'


export function useResetMemorizationTime() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const appState = useAppStateStore()


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function run() {
    const lastResetAt = appState.memorizationTimeResetAt
    const now         = new Date()
    const today       = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`

    if (lastResetAt !== today) {
      appState.memorizationTimeSpend = 0
      appState.memorizationTimeResetAt = today
    }
  }

  return { run }
}