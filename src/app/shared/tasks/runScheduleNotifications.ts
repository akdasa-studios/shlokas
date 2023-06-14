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
  const MAX_SCHEDULES = 5
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
    for (
      let id = SCHEDULE_NOTIFICATION_IDS;
      id <= SCHEDULE_NOTIFICATION_IDS+MAX_SCHEDULES;
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
            title: 'Shlokas',
            body: 'Time to learn shlokas',
            schedule: {
              on: {
                hour: hours,
                minute: minutes
              },
              every: 'day'
            },
          }
        ]
      })
    }
  }

  return { run }
}