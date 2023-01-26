import { AddVerseToInboxDeckUseCase, SearchVersesUseCase } from '@/app/library'
import { InitArgs, InitStageResult } from './initialization'


export function initLibrary({ app }: InitArgs): InitStageResult {
  return {
    inject: {
      "AddVerseToInboxDeckUseCase": new AddVerseToInboxDeckUseCase(app),
      "SearchVersesUseCase": new SearchVersesUseCase(app)
    }
  }
}