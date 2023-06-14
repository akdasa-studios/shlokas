import { Badge } from '@capawesome/capacitor-badge'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useStatisticsStore } from '@/app/statistics'
import { useSettingsStore } from '@/app/settings'


export function useUpdateAppBadge() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const statisticsStore = useStatisticsStore()
  const settingsStore = useSettingsStore()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { cardsInReview } = storeToRefs(statisticsStore)
  const { showAppBadge } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function run() {
    const isSupportd = await Badge.isSupported()
    if (!isSupportd) { return }

    watch([
      cardsInReview,
      showAppBadge
    ], onCardsInReviewChanged)
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onCardsInReviewChanged() {
    if (!showAppBadge.value) { Badge.clear(); return }

    // Check for permissions
    const permissions = await Badge.checkPermissions()
    if (permissions.display !== 'granted') {
      await Badge.requestPermissions()
    }

    // Set value
    Badge.set({ count: cardsInReview.value })
  }

  return { run }
}