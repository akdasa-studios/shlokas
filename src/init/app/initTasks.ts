import { runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runTutorialPersistenceTask, runTutorialRestoreTask } from '@/app/tutorial'


export async function initTasks() {
  runUpdateStatisticsTask()
  runSyncTask()
  runTutorialPersistenceTask()
  await runTutorialRestoreTask()
}