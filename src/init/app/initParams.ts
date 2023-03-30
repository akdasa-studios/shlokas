import { Application } from '@akdasa-studios/shlokas-core'
import { InitArgs } from '../initialization'
import { useSettingsStore } from './../../app/settings/stores/useSettingsStore'
import { useTutorialStore } from './../../app/tutorial/stores/useTutorialStore'


export async function initParams(
  { get }: InitArgs
) {
  const shlokas = get<Application>('app')
  const params = new URLSearchParams(window.location.search)
  const tutorialEnabled = params.get('tutorialEnabled')
  const libraryLastSyncDate = params.get('libraryLastSyncDate')
  const date = params.get('date')

  const tutorialStore = useTutorialStore()
  const settingsStore = useSettingsStore()

  if (tutorialEnabled) {
    console.debug('[params] tutorialEnabled', tutorialEnabled)
    tutorialStore.enabled = ['true', '1'].includes(tutorialEnabled)
  }

  if (libraryLastSyncDate) {
    console.debug('[params] libraryLastSyncDate', libraryLastSyncDate)
    settingsStore.library.lastSyncDate = parseInt(libraryLastSyncDate)
  }


  if (date) {
    console.debug('[params] date', date)
    shlokas.timeMachine.set(new Date(date))
  }
}