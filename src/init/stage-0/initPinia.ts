import { createPinia } from 'pinia'
import { InitArgs } from '../initialization'


/**
 * Initialize the pinia plugin to store application state
 */
export async function initPinia(
  { vue }: InitArgs
) {
  vue.use(createPinia())
}
