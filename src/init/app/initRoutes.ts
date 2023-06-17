import { createRouter, createWebHistory } from '@ionic/vue-router'

import routes from '@/router'
import { useAppStateStore } from '@/app/shared'
import { InitArgs } from '../initialization'


export async function initRoutes(
  { get }: InitArgs
) {
  const vue = get('vue') as any
  const appStateStore = useAppStateStore()

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  router.afterEach((g) => appStateStore.routeName = g.name?.toString() || '')

  vue.use(router)
  return { router }
}