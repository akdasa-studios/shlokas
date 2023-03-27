import { Application } from '@akdasa-studios/shlokas-core'
import { InitArgs } from '../initialization'


export async function initParams(
  { get }: InitArgs
) {
  const shlokas = get<Application>('app')
  const params = new URLSearchParams(window.location.search)
  // const tutorialEnabled = params.get('tutorialEnabled')
  const date = params.get('date')

  // if (tutorialEnabled) {
  //   console.debug('[params] tutorialEnabled', tutorialEnabled)
  // }
  if (date) {
    console.debug('[params] date', date)
    shlokas.timeMachine.set(new Date(date))
  }
}