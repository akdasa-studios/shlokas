import { useSettingsPersistenceTask } from '@/app/settings'
import { runEnterFullscreenMode, runHideStatusBar, useScheduleNotifications, runSyncTask, useUpdateAppBadge, useResetMemorizationTime, useAppStatePersistenceTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runTutorialPersistenceTask, runTutorialRestoreTask } from '@/app/tutorial'


export async function initTasks() {
  await useSettingsPersistenceTask().run()
  await useAppStatePersistenceTask().run()

  await useScheduleNotifications().run()
  await useUpdateAppBadge().run()
  await useResetMemorizationTime().run()

  runUpdateStatisticsTask()
  runSyncTask()
  runTutorialPersistenceTask()
  await runTutorialRestoreTask()
  runEnterFullscreenMode()
  runHideStatusBar()
}