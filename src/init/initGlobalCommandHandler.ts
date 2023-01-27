import { InboxCardMemorized , UpdateVerseStatus , AddVerseToInboxDeck } from '@akdasa-studios/shlokas-core'
import { CardMemorizationUseCase, InboxDeckTutorialUseCase } from '@/app/decks/inbox'
import { SearchVersesUseCase } from '@/app/library'
import { UserGradesCardsUseCase } from '@/app/decks/review'
import { InitArgs, InitStageResult } from './initialization'


export async function initGlobalCommandHandler({ app, get }: InitArgs): Promise<InitStageResult> {
  app.processor.commandExecuted.subscribe((cmd: any) => handle({app, get}, cmd))
  app.processor.commandReverted.subscribe((cmd: any) => handle({app, get}, cmd))
  return {}
}

function handle({ get }: InitArgs, cmd: any) {
  if (cmd instanceof AddVerseToInboxDeck) {
    get<CardMemorizationUseCase>("CardMemorizationUseCase").open()
    get<InboxDeckTutorialUseCase>("InboxDeckTutorialUseCase").open()
  } else if (cmd instanceof UpdateVerseStatus) {
    get<SearchVersesUseCase>("SearchVersesUseCase").refreshVerse(cmd.verseId)
  } else if (cmd instanceof InboxCardMemorized) {
    get<UserGradesCardsUseCase>("UserGradesCardsUseCase").open()
  }
}