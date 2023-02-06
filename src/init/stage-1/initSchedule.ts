import { App } from '@capacitor/app'
import { InitArgs } from '../initialization'

export async function initSchedule(
  { get }: InitArgs
) {
  App.addListener('appStateChange', async ({ isActive }) => {
    if (!isActive) { return }

    const case1 = get("CardMemorizationUseCase") as any
    const case2 = get("UserGradesCardsUseCase") as any
    case1.addCardsToDeck()
    case2.addCardsToDeck()
  })
}
