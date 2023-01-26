import { UpdateVerseStatus , AddVerseToInboxDeck } from '@akdasa-studios/shlokas-core'
import { CardMemorizationUseCase } from '@/app/decks/inbox'
import { SearchVersesUseCase } from '@/app/library'
import { InitArgs, InitStageResult } from './initialization'


export function initGlobalCommandHandler({ app, get }: InitArgs): InitStageResult {
  app.processor.commandExecuted.subscribe((cmd: any) => handle({app, get}, cmd))
  app.processor.commandReverted.subscribe((cmd: any) => handle({app, get}, cmd))
  return {}
}

function handle({ get }: InitArgs, cmd: any) {
  if (cmd instanceof AddVerseToInboxDeck) {
    get<CardMemorizationUseCase>("CardMemorizationUseCase").open()
  } else if (cmd instanceof UpdateVerseStatus) {
    get<SearchVersesUseCase>("SearchVersesUseCase").refreshVerse(cmd.verseId)
  }
}