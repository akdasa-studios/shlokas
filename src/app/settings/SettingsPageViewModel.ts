import { ref } from 'vue'
import { Language } from '@akdasa-studios/shlokas-core'
import { ViewModel } from '@/app/DomainViewModel'
import { i18n } from '@/i18n'
import { ApplicationViewModel } from '../ApplicationViewModel'


export class SettingsPageViewModel extends ViewModel {
  constructor(private readonly shlokas: ApplicationViewModel) {
    super()
  }

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
  public language = ref(new Language("en", "English"))

  /** Changes language */
  public changeLanguage(lang: Language) {
    this.shlokas.app.settings.changeLanguage(lang)
    i18n.global.locale.value = lang.code as any
    this.sync()
  }

  /** Sync view model with domain */
  sync() {
    this.language.value = this.shlokas.app.settings.language
  }
}