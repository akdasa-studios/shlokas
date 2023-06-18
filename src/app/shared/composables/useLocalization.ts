
import { I18n } from 'vue-i18n'

let i18n: I18n

export function useLocalization() {

  function init(instance: any) {
    i18n = instance
  }

  function t(key: string) {
    // @ts-ignore
    return i18n.global.t(key)
  }

  return { init, t }
}