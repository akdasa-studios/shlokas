import { Deploy } from 'cordova-plugin-ionic'
import { App } from '@capacitor/app'

export async function useAppVersion() {
  let appInfo = { version: '??', build: '??' }
  try {
    appInfo = await App.getInfo()
  } catch (e) {
    /// ignore
  }
  const deployInfo = await Deploy.getCurrentVersion()

  const binaryVersion = deployInfo?.binaryVersionName || appInfo.version || '??'
  const binaryBuild = deployInfo?.binaryVersionCode || appInfo.build || '??'
  const version = deployInfo?.versionId ?? '??'
  const build = deployInfo?.buildId ?? '??'
  const channel = deployInfo?.channel ?? '??'

  return `${binaryVersion}v${binaryBuild} :: ${version}v${build} :: ${channel}`
}