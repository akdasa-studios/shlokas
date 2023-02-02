import { AnyResult, Command } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, InboxCardMemorized, UpdateVerseStatus } from '@akdasa-studios/shlokas-core'
import { CardMemorizationUseCase, InboxDeckTutorialUseCase } from '@/app/decks/inbox'
import { UserGradesCardsUseCase } from '@/app/decks/review'
import { SearchVersesUseCase } from '@/app/library'
import { InitArgs, InitStageResult } from '../initialization'


export async function initCommands(
  { shlokas, get }: InitArgs
): Promise<InitStageResult> {
  shlokas.processor.commandExecuted.subscribe((cmd: any) => handle({ get }, cmd))
  shlokas.processor.commandReverted.subscribe((cmd: any) => handle({ get }, cmd))
  return {}
}

function handle(
  { get }: Pick<InitArgs, "get">,
  cmd: Command<unknown, AnyResult>
) {
  console.debug('[commands] ', cmd)

  if (cmd instanceof AddVerseToInboxDeck) {
    get<CardMemorizationUseCase>("CardMemorizationUseCase").addCardsToDeck()
    get<InboxDeckTutorialUseCase>("InboxDeckTutorialUseCase").addTutorialCards()
  } else if (cmd instanceof UpdateVerseStatus) {
    get<SearchVersesUseCase>("SearchVersesUseCase").refreshVerse(cmd.verseId)
  } else if (cmd instanceof InboxCardMemorized) {
    get<UserGradesCardsUseCase>("UserGradesCardsUseCase").addCardsToDeck()
  }
}