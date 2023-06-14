import { Badge } from '@capawesome/capacitor-badge'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useStatisticsStore } from '@/app/statistics'
import { useSettingsStore } from '@/app/settings'
import { useLogger } from '../composables/useLogger'


export function useUpdateAppBadge() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const statisticsStore = useStatisticsStore()
  const settingsStore = useSettingsStore()
  const logger = useLogger('badge')


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { cardsInReview } = storeToRefs(statisticsStore)
  const { showAppBadge } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function run() {
    try {
      const isSupportd = await Badge.isSupported()
      if (!isSupportd) { return }

      watch([
        cardsInReview,
        showAppBadge
      ], onCardsInReviewChanged)
    } catch (e) {
      logger.error('Error while starting UpdateAppBadge task: ' + e)
    }
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