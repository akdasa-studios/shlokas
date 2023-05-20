import { runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runTutorialPersistenceTask, runTutorialRestoreTask, runSettingsPersistenceTask, runSettingsRestoreTask } from '@/app/tutorial'


export async function initTasks() {
  runSettingsPersistenceTask()
  await runSettingsRestoreTask()
  runUpdateStatisticsTask()
  runSyncTask()
  runTutorialPersistenceTask()
  await runTutorialRestoreTask()
}