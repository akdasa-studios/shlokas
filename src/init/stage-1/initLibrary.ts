import { Emitter } from 'mitt'
import { Events } from '@/app/Events'
import { AddVerseToInboxDeckUseCase, SearchVersesUseCase } from '@/app/library'
import { InitArgs, InitStageResult } from '../initialization'


export async function initLibrary(
  { get, shlokas }: InitArgs
): Promise<InitStageResult> {
  const emitter = get<Emitter<Events>>("emitter")
  return {
    inject: {
      "AddVerseToInboxDeckUseCase": new AddVerseToInboxDeckUseCase(shlokas),
      "SearchVersesUseCase": new SearchVersesUseCase(shlokas, emitter)
    }
  }
}