import { useSettingsPersistenceTask } from '@/app/settings'
import { runEnterFullscreenMode, runHideStatusBar, useScheduleNotifications, runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runTutorialPersistenceTask, runTutorialRestoreTask } from '@/app/tutorial'


export async function initTasks() {
  await useSettingsPersistenceTask().run()
  await useScheduleNotifications().run()

  runUpdateStatisticsTask()
  runSyncTask()
  runTutorialPersistenceTask()
  await runTutorialRestoreTask()
  runEnterFullscreenMode()
  runHideStatusBar()
}