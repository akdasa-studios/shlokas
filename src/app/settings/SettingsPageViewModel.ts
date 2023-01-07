import { Language } from '@akdasa-studios/shlokas-core'
import { Storage } from '@ionic/storage'
import { computed, ref, watchEffect } from 'vue'
import { i18n } from '@/i18n'
import { ViewModel } from '@/app/DomainViewModel'
import { ApplicationViewModel } from '../ApplicationViewModel'


const HOST = process.env.NODE_ENV === "development" ? 'localhost' : 'shlokas.app'

export class SettingsPageViewModel extends ViewModel {
  private _store: Storage
  public readonly authHost = `https://${HOST}/auth`

  constructor(private readonly shlokas: ApplicationViewModel) {
    super()
    this._store = new Storage()
    this._store.create()

    watchEffect(() => {
      if (this.name.value === undefined) { return }
      this._store.set("name", this.name.value)
    })
    watchEffect(() => {
      if (this.email.value === undefined) { return }
      this._store.set("email", this.email.value)
    })
    watchEffect(() => {
      if (this.password.value === undefined) { return }
      this._store.set("password", this.password.value)
    })
    watchEffect(() => {
      if (this.colorfulCards.value == undefined) { return }
      this._store.set("colorfulCards", this.colorfulCards.value)
    })
    watchEffect(() => {
      if (this.authToken.value === undefined) { return }
      this._store.set("authToken", JSON.stringify(this.authToken.value))
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Account                                  */
  /* -------------------------------------------------------------------------- */

  public readonly name = ref()
  public readonly email = ref()
  public readonly password = ref()
  public readonly colorfulCards = ref()
  public readonly authToken = ref()
  public readonly dbConnectionString = computed(() => {
    if (!this.authToken.value) { return undefined }
    return this.authToken.value.dbName
      .replace('db:5984', `${HOST}/db`)
      .replace('http://', 'https://')
  })
  public readonly isAuthenticated = computed(() => {
    return !!this.authToken.value
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
    this.name.value = await this._store.get('name')
    this.email.value = await this._store.get('email')
    this.password.value = await this._store.get('password')
    this.colorfulCards.value = await this._store.get('colorfulCards')
    this.authToken.value = JSON.parse(await this._store.get('authToken'))
  }
}