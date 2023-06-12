import { runSettingsPersistenceTask, runSettingsRestoreTask } from '@/app/settings'
import { runEnterFullscreenMode, runHideStatusBar, runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runTutorialPersistenceTask, runTutorialRestoreTask } from '@/app/tutorial'


export async function initTasks() {
  runSettingsPersistenceTask()
  await runSettingsRestoreTask()
  runUpdateStatisticsTask()
  runSyncTask()
  runTutorialPersistenceTask()
  await runTutorialRestoreTask()
  runEnterFullscreenMode()
  runHideStatusBar()
}