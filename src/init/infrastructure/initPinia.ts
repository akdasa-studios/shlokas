import { createPinia } from 'pinia'
import { App } from 'vue'
import { InitArgs } from '../initialization'


/**
 * Initialize the pinia plugin to store application state
 */
export async function initPinia(
  { get }: InitArgs
) {
  const vue = get<App>('vue')
  vue.use(createPinia())
}
