import { createPinia } from 'pinia'
import { InitArgs } from '../initialization'

export async function initPinia(
  { vue }: InitArgs
) {
  const pinia = createPinia()
  vue.use(pinia)
}
