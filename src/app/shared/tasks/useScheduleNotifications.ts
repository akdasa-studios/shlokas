import { LocalNotifications } from '@capacitor/local-notifications'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { Capacitor } from '@capacitor/core'
import { useLocalization } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'
import { useLogger } from '../composables/useLogger'


export function useScheduleNotifications() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const settingsStore = useSettingsStore()
  const logger        = useLogger('notifications')
  const localization  = useLocalization()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const SCHEDULE_NOTIFICATION_IDS = 1000
  const MAX_SCHEDULES = 5
  const { enableNotifications, notificationTime } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                  Actions                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Runs the task to schedule notifications
   */
  async function run() {
    try {
      const available = await isAvailable()
      if (!available) { return }

      // Once "enable notifications" is changed, orf "notification time" is
      // changed, schedule notifications
      watch([
        enableNotifications,
        notificationTime
      ], scheduleNotifications)
    } catch (e) {
      logger.error('Error while starting ScheduleNotifications task: ' + e)
    }
  }

  /**
   * Requests permissions to schedule notifications
   */
  async function requestPermissions() {
    const permissions = await LocalNotifications.checkPermissions()
    if (permissions.display !== 'granted') {
      await LocalNotifications.requestPermissions()
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function scheduleNotifications() {
    const permissions = await LocalNotifications.checkPermissions()
    if (permissions.display !== 'granted') { return }

    // Cancel all previously scheduled notifications
    for (
      let id = SCHEDULE_NOTIFICATION_IDS;
      id <= SCHEDULE_NOTIFICATION_IDS + MAX_SCHEDULES;
      id++
    ) {
      await LocalNotifications.cancel({ notifications: [{ id }] })
    }

    // If notifications are disabled, do nothing
    if (!enableNotifications.value) return

    // Schedule notifications for each time
    for (const [idx, time] of settingsStore.notificationTime.entries()) {
      const [hours, minutes] = time

      // Schedule notification
      LocalNotifications.schedule({
        notifications: [
          {
            id: SCHEDULE_NOTIFICATION_IDS + idx,
            title: localization.t('app.name'),
            body: localization.t('notifications.reminder'),
            schedule: {
              on: {
                hour: hours,
                minute: minutes
              },
              every: 'day'
            },
            sound: ''
          }
        ]
      })
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  async function isAvailable() {
    const isPluginAvailable = Capacitor.isPluginAvailable('LocalNotifications')
    if (!isPluginAvailable) { return false }
    return true
  }

  return { run, requestPermissions }
}