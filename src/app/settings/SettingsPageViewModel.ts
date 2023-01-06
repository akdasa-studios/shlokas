import { Language } from '@akdasa-studios/shlokas-core'
import { Storage } from '@ionic/storage'
import { computed, ref, watchEffect } from 'vue'
import { i18n } from '@/i18n'
import { ViewModel } from '@/app/DomainViewModel'
import { ApplicationViewModel } from '../ApplicationViewModel'


export class SettingsPageViewModel extends ViewModel {
  private _store: Storage
  public readonly dbHost = "shlokas.app/db"
  public readonly authHost = "https://shlokas.app/auth/user"

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
    watchEffect(() => {
      if (this.colorfulCards.value == undefined) { return }
      this._store.set("colorfulCards", this.colorfulCards.value)
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Account                                  */
  /* -------------------------------------------------------------------------- */

  public readonly login = ref()
  public readonly password = ref()
  public readonly dbName = ref()
  public readonly colorfulCards = ref()
  public readonly syncServer = computed(() => {
    return `https://${this.login.value}:${this.password.value}@${this.dbHost}/${this.dbName.value}`
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
  public language = ref(this.availableLanguages[0])

  /** Changes language */
  public async changeLanguage(lang: Language) {
    await this._store.set("language", lang.code)
    if (i18n) {
      i18n.global.locale.value = lang.code as any
    }
    await this.sync()
  }

  /** Sync view model with domain */
  async sync() {
    const langCode = await this._store.get('language')
    this.language.value = this.availableLanguages.find(x => x.code === langCode)
                          || this.availableLanguages[0]
    if (i18n) {
      i18n.global.locale.value = this.language.value.code as any
    }
    this.login.value = await this._store.get('login')
    this.password.value = await this._store.get('password')
    this.dbName.value = await this._store.get('dbName')
    this.dbName.value = await this._store.get('dbName')
    this.colorfulCards.value = await this._store.get('colorfulCards')
  }
}