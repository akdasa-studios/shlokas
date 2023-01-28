import { useTutorialStore } from '@/app/decks/shared'
import { InitStageResult } from './initialization'


export async function initParams(): Promise<InitStageResult> {
  const tutorialSore = useTutorialStore()

  const params = new URLSearchParams(window.location.search)
  const tutorialEnabled = params.get('tutorialEnabled')
  if (tutorialEnabled) {
    tutorialSore.enabled = tutorialEnabled === 'true'
  }

  return {}
}