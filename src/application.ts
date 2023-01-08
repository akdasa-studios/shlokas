import { App } from '@capacitor/app'



App.addListener('appStateChange', async ({ isActive }) => {
  // if (isActive) {
  //   return
  // }
  // // The app state has been changed to inactive.
  // // Start the background task by calling `beforeExit`.
  // const taskId = await BackgroundTask.beforeExit(async () => {
  //   if (shlokas.settings.dbConnectionString.value) {
  //     await couchDB.sync(shlokas.settings.dbConnectionString.value)
  //   }
  //   BackgroundTask.finish({ taskId })
  // })
})
