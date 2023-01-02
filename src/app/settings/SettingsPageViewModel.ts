import { ref, watchEffect, computed } from 'vue'
import { Language } from '@akdasa-studios/shlokas-core'
import { Storage } from '@ionic/storage'
import { ViewModel } from '@/app/DomainViewModel'
import { i18n } from '@/i18n'
import { ApplicationViewModel } from '../ApplicationViewModel'


export class SettingsPageViewModel extends ViewModel {
  private _store: Storage
  public readonly dbHost = "45.134.226.153:5984"
  public readonly authHost = "http://45.134.226.153:8912/auth/user"

  constructor(private readonly shlokas: ApplicationViewModel) {
    super()
    this._store = new Storage()
    this._store.create()

    watchEffect(() => {
      if (this.login.value === undefined) { return }
      this._store.set("login", this.login.value)
    })
    watchEffect(() => {
      if (this.password.value === undefined) { return }
      this._store.set("password", this.password.value)
    })
    watchEffect(() => {
      if (!this.dbName.value) { return }
      this._store.set("dbName", this.dbName.value)
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Account                                  */
  /* -------------------------------------------------------------------------- */

  public readonly login = ref()
  public readonly password = ref()
  public readonly dbName = ref()
  public readonly syncServer = computed(() => {
    return `http://${this.login.value}:${this.password.value}@${this.dbHost}/${this.dbName.value}`
  })

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
  async sync() {
    this.language.value = this.shlokas.app.settings.language
    this.login.value = await this._store.get('login')
    this.password.value = await this._store.get('password')
    this.dbName.value = await this._store.get('dbName')
  }
}