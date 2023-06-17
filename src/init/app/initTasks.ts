import { useSettingsPersistenceTask } from '@/app/settings'
import { runEnterFullscreenMode, runHideStatusBar, useScheduleNotifications, useSyncTask, useUpdateAppBadge, useResetMemorizationTime, useAppStatePersistenceTask } from '@/app/shared'
import { useUpdateStatisticsTask } from '@/app/statistics'
import { useTutorialPersistenceTask, } from '@/app/tutorial'


export async function initTasks() {
  await useSettingsPersistenceTask().run()
  await useAppStatePersistenceTask().run()
  await useSyncTask().run()
  await useUpdateStatisticsTask().run()
  await useScheduleNotifications().run()
  await useUpdateAppBadge().run()
  await useResetMemorizationTime().run()
  await useTutorialPersistenceTask().run()

  runEnterFullscreenMode()
  runHideStatusBar()
}