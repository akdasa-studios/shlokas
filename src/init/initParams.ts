import { useTutorialStore } from '@/app/decks/shared'
import { InitArgs, InitStageResult } from './initialization'


export async function initParams({ app }: InitArgs): Promise<InitStageResult> {
  const tutorialSore = useTutorialStore()

  const params = new URLSearchParams(window.location.search)
  const tutorialEnabled = params.get('tutorialEnabled')
  const date = params.get('date')
  if (tutorialEnabled) { tutorialSore.enabled = tutorialEnabled === 'true' }
  if (date) { app.timeMachine.set(new Date(date)) }

  return {}
}