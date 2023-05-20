import { runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runTutorialPersistenceTask, runTutorialRestoreTask, runSettingsPersistenceTask } from '@/app/tutorial'


export async function initTasks() {
  runSettingsPersistenceTask()
  runUpdateStatisticsTask()
  runSyncTask()
  runTutorialPersistenceTask()
  await runTutorialRestoreTask()
}