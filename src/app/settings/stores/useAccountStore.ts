import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useDeviceStore } from '@/app/useDeviceStorage'
import { HOST } from '../../Env'


export const useAccountStore = defineStore('settings/account', () => {
  const KEY_NAME = 'name'
  const KEY_EMAIL = 'email'
  const KEY_PASSWORD = 'password'
  const KEY_TOKEN = 'token'
  const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const name = ref("")
  const email = ref("")
  const password = ref("")
  const token = ref()
  const isAuthenticated = computed(() => !!token.value)

  const syncHost = computed(() => {
    if (!token.value) { return undefined }
    if (process.env.NODE_ENV === 'development' ) {
      return token.value.dbName
        .replace('db:5984', `${HOST}/db`)
    }
    return token.value.dbName
      .replace('db:5984', `${HOST}/db`)
      .replace('http://', 'https://')
  })

  watch(name, onNameChanged)
  watch(email, onEmailChanged)
  watch(password, onPasswordChanged)
  watch(token, onTokenChanged)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    name.value = await storage.get(KEY_NAME)
    email.value = await storage.get(KEY_EMAIL)
    password.value = await storage.get(KEY_PASSWORD)
    token.value = JSON.parse(await storage.get(KEY_TOKEN))
  }

  function logOut() {
    name.value = ""
    email.value = ""
    password.value = ""
    token.value = ""
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Private                                  */
  /* -------------------------------------------------------------------------- */

  async function onNameChanged(value: string) {
    await storage.set(KEY_NAME, value)
  }

  async function onEmailChanged(value: string) {
    await storage.set(KEY_EMAIL, value)
  }

  async function onPasswordChanged(value: string) {
    await storage.set(KEY_PASSWORD, value)
  }

  async function onTokenChanged(value: any) {
    await storage.set(KEY_TOKEN, JSON.stringify(value))
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { name, email, password, load, logOut, isAuthenticated, token, syncHost }
})