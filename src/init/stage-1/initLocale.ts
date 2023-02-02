import { InitArgs } from '../initialization'

export async function initLocale(
  { get }: InitArgs
) {
  const deviceStorage = get("deviceStorage") as any
  const lang = (await deviceStorage.get("language")) || 'en'
  const i18n = get("i18n") as any
  i18n.locale.value = lang
}
