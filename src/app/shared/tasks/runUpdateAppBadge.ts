import { Badge } from '@capawesome/capacitor-badge'
import { Capacitor } from '@capacitor/core'
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
  const settingsStore   = useSettingsStore()
  const logger          = useLogger('badge')


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { cardsInReview } = storeToRefs(statisticsStore)
  const { showAppBadge } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Runs the task to update the app badge
   */
  async function run() {
    try {
      const available = await isAvailable()
      if (!available) {
        logger.debug('Badge plugin is not available')
        return
      }

      watch([
        cardsInReview,
        showAppBadge
      ], onCardsInReviewChanged)
    } catch (e) {
      logger.error('Error while starting UpdateAppBadge task: ' + e)
    }
  }

  async function requestPermissions() {
    const permissions = await Badge.checkPermissions()
    if (permissions.display !== 'granted') {
      await Badge.requestPermissions()
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onCardsInReviewChanged() {
    const permissions = await Badge.checkPermissions()
    if (permissions.display !== 'granted') { return }

    await setBadgeValue(cardsInReview.value)
  }


  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  async function isAvailable() {
    const isPluginAvailable = Capacitor.isPluginAvailable('Badge')
    if (!isPluginAvailable) { return false }

    const isSupportd = await Badge.isSupported()
    if (!isSupportd) { return false }

    return true
  }

  async function setBadgeValue(value: number) {
    if (!showAppBadge.value) { Badge.clear(); return }
    Badge.set({ count: value })
  }

  return { run, requestPermissions }
}