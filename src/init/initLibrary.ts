import { AddVerseToInboxDeckUseCase, SearchVersesUseCase } from '@/app/library'
import { InitArgs, InitStageResult } from './initialization'


export async function initLibrary({ app }: InitArgs): Promise<InitStageResult> {
  return {
    inject: {
      "AddVerseToInboxDeckUseCase": new AddVerseToInboxDeckUseCase(app),
      "SearchVersesUseCase": new SearchVersesUseCase(app)
    }
  }
}