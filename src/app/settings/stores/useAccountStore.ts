import { defineStore } from 'pinia'
import { computed, Ref, ref, watch } from 'vue'
import { useDeviceStore, useEnv } from '@/app/shared'
import { AuthToken } from '@/services/AuthService'


export const useAccountStore = defineStore('settings/account', () => {
  const KEY_NAME     = 'name'
  const KEY_EMAIL    = 'email'
  const KEY_PASSWORD = 'password'
  const KEY_TOKEN    = 'token'
  const storage      = useDeviceStore()
  const env          = useEnv()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const name     = ref('')
  const email    = ref('')
  const password = ref('')
  const token: Ref<AuthToken|undefined> = ref()
  const isAuthenticated = computed(() => !!token.value)

  const syncHost = computed(() => {
    if (!token.value) { return undefined }
    if (env.isDevelopment()) {
      return token.value.dbName
        .replace('db:5984', `${env.getHost()}/db`)
    }
    return token.value.dbName
      .replace('db:5984', `${env.getHost()}/db`)
      .replace('http://', 'https://')
  })

  watch(name, onNameChanged)
  watch(email, onEmailChanged)
  watch(password, onPasswordChanged)
  watch(token, onTokenChanged, { deep: true })

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    name.value     = await storage.get(KEY_NAME)
    email.value    = await storage.get(KEY_EMAIL)
    password.value = await storage.get(KEY_PASSWORD)
    token.value    = JSON.parse(await storage.get(KEY_TOKEN))
  }

  function logOut() {
    name.value = ''
    email.value = ''
    password.value = ''
    token.value = undefined
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