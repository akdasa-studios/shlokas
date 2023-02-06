import { ReviewCardReviewed , AddVerseToInboxDeck, InboxCardMemorized, UpdateVerseStatus } from '@akdasa-studios/shlokas-core'
import { AnyResult, Command } from '@akdasa-studios/framework'
import { CardMemorizationUseCase, InboxDeckTutorialUseCase } from '@/app/decks/inbox'
import { UserGradesCardsUseCase } from '@/app/decks/review'
import { SearchVersesUseCase } from '@/app/library'
import { useStatisticsStore } from '@/app/statistics'
import { InitArgs, InitStageResult } from '../initialization'


export async function initCommands(
  { shlokas, get }: InitArgs
): Promise<InitStageResult> {
  shlokas.processor.commandExecuted.subscribe((cmd: any) => handle({ shlokas, get }, cmd))
  shlokas.processor.commandReverted.subscribe((cmd: any) => handle({ shlokas, get }, cmd))
  return {}
}

function handle(
  { shlokas, get }: Pick<InitArgs, "get"|"shlokas">,
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
  } else if (cmd instanceof ReviewCardReviewed) {
    useStatisticsStore(shlokas).load()
  }
}