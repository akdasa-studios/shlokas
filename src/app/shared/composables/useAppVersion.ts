import { Deploy } from 'cordova-plugin-ionic'
import { App } from '@capacitor/app'

export async function useAppVersion() {
  let appInfo = { version: 'unknown', build: 'unknown' }
  try {
    appInfo = await App.getInfo()
  } catch (e) {
    /// ignore
  }
  const deployInfo = await Deploy.getCurrentVersion()

  const binaryVersion = deployInfo?.binaryVersionName || appInfo.version || 'unknown'
  const binaryBuild = deployInfo?.binaryVersionCode || appInfo.build || 'unknown'
  const version = deployInfo?.versionId ?? 'unknown'
  const build = deployInfo?.buildId ?? 'unknown'
  const channel = deployInfo?.channel ?? 'unknown'

  return `${binaryVersion}v${binaryBuild} :: ${version}v${build} :: ${channel}`
}