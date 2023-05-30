import { Deploy } from 'cordova-plugin-ionic'
import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'

export async function useAppVersion() {
  if (Capacitor.getPlatform() === 'web') {
    return 'web'
  }

  let appInfo = { version: '??', build: '??' }
  try {
    appInfo = await App.getInfo()
  } catch (e) {
    /// ignore
  }
  const deployInfo = await Deploy.getCurrentVersion()

  const binaryVersion = deployInfo?.binaryVersionName || appInfo.version || '??'
  const binaryBuild = deployInfo?.binaryVersionCode || appInfo.build || '??'
  const build = deployInfo?.buildId ?? '??'
  const channel = deployInfo?.channel ?? '??'

  return `${binaryVersion}-${binaryBuild} :: ${build} :: ${channel}`
}