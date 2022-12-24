import { ref } from 'vue'
import { Language } from '@akdasa-studios/shlokas-core'
import { ViewModel } from '@/app/DomainViewModel'
import { root } from '@/application'
import { i18n } from '@/i18n'


export class SettingsPageViewModel implements ViewModel {
  /** List of available languages */
  public readonly availableLanguages = [
    new Language("en", "English"),
    new Language("ru", "Русский"),
    new Language("rs", "Српски")
  ]

  /** Current language */
  public language = ref<Language>(new Language("en", "English"))

  /** Changes language */
  public changeLanguage(lang: Language) {
    root.app.settings.changeLanguage(lang)
    i18n.global.locale.value = lang.code as any
    this.sync()
  }

  /** Sync view model with domain */
  sync() {
    this.language.value = root.app.settings.language
  }
}