import { useTutorialStore } from '@/app/decks/shared'
import { InitArgs, InitStageResult } from '../initialization'


export async function initParams(
  { shlokas }: InitArgs
) {
  const tutorialSore = useTutorialStore()
  const params = new URLSearchParams(window.location.search)
  const tutorialEnabled = params.get('tutorialEnabled')
  const date = params.get('date')

  if (tutorialEnabled) {
    console.debug('[params] tutorialEnabled', tutorialEnabled)
    tutorialSore.enabled = tutorialEnabled === 'true'
  }
  if (date) {
    console.debug('[params] date', date)
    shlokas.timeMachine.set(new Date(date))
  }
}