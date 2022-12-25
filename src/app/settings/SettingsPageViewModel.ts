import { ref } from 'vue'
import { Language } from '@akdasa-studios/shlokas-core'
import { ViewModel } from '@/app/DomainViewModel'
import { shlokas } from '@/application'
import { i18n } from '@/i18n'


export class SettingsPageViewModel implements ViewModel {

  /* -------------------------------------------------------------------------- */
  /*                               Answer Buttons                               */
  /* -------------------------------------------------------------------------- */

  public readonly showGradeButtons = ref<boolean>(false)

  /* -------------------------------------------------------------------------- */
  /*                                  Language                                  */
  /* -------------------------------------------------------------------------- */

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
    shlokas.app.settings.changeLanguage(lang)
    i18n.global.locale.value = lang.code as any
    this.sync()
  }

  /** Sync view model with domain */
  sync() {
    this.language.value = shlokas.app.settings.language
  }
}