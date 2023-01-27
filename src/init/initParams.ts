import { useTutorialStore } from '@/app/decks/shared'
import { InitStageResult, InitArgs } from './initialization'


export async function initParams({ app }: InitArgs): Promise<InitStageResult> {
  const tutorialSore = useTutorialStore()

  const params = new URLSearchParams(window.location.search)
  const tutorialEnabled = params.get('tutorialEnabled')
  if (tutorialEnabled) {
    tutorialSore.enabled = tutorialEnabled === 'true'
  }

  return {}
}