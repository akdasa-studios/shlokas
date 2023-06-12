import { createRouter, createWebHistory } from '@ionic/vue-router'

import routes from '@/router'
import { InitArgs } from '../initialization'


export async function initRoutes(
  { get }: InitArgs
) {
  const vue = get('vue') as any
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  vue.use(router)
  return { router }
}