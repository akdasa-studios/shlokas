import { LocalNotifications } from '@capacitor/local-notifications'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useSettingsStore } from '@/app/settings'


export function useScheduleNotifications() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const settingsStore = useSettingsStore()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const SCHEDULE_NOTIFICATION_IDS = 1000
  const { enableNotifications, notificationTime } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  async function run() {
    // Once "enable notifications" is changed, orf "notification time" is
    // changed, schedule notifications
    watch([
      enableNotifications,
      notificationTime
    ], scheduleNotifications)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function scheduleNotifications() {
    // Cancel all previously scheduled notifications
    for (const [idx] of settingsStore.notificationTime.entries()) {
      await LocalNotifications.cancel({ notifications: [{ id: SCHEDULE_NOTIFICATION_IDS + idx }] })
    }

    // If notifications are disabled, do nothing
    if (!enableNotifications.value) return

    // Schedule notifications for each time
    for (const [idx, time] of settingsStore.notificationTime.entries()) {
      const alarmTime        = new Date()
      const [hours, minutes] = time
      const isEarlierThanNow = hours <= alarmTime.getHours() && minutes <= alarmTime.getMinutes()

      // If the alarm time is earlier than now, schedule it for tomorrow
      if (isEarlierThanNow) {
        alarmTime.setDate(alarmTime.getDate() + 1)
      }
      alarmTime.setHours(hours, minutes, 0, 0)

      // Schedule notification
      LocalNotifications.schedule({
        notifications: [
          {
            id: SCHEDULE_NOTIFICATION_IDS + idx,
            title: 'Shlokas',
            body: 'Time to learn shlokas',
            schedule: { at: alarmTime },
          }
        ]
      })
    }
  }

  return { run }
}