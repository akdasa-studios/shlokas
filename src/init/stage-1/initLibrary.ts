import { AddVerseToInboxDeckUseCase, SearchVersesUseCase } from '@/app/library'
import { InitArgs, InitStageResult } from '../initialization'


export async function initLibrary(
  { shlokas }: InitArgs
): Promise<InitStageResult> {
  return {
    inject: {
      "AddVerseToInboxDeckUseCase": new AddVerseToInboxDeckUseCase(shlokas),
      "SearchVersesUseCase": new SearchVersesUseCase(shlokas)
    }
  }
}