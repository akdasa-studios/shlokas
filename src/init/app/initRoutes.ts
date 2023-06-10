import { createRouter, createWebHistory } from '@ionic/vue-router'

import routes from '@/router'
import { useScreenOrientation } from '@/app/shared/composables/useScreenOrientation'
import { InitArgs } from '../initialization'


export async function initRoutes(
  { get }: InitArgs
) {

  const screenOrientation = useScreenOrientation()
  const vue = get('vue') as any
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })


  router.beforeEach(async guard => {
    const unlockScreenOrientations = guard.meta?.unlockScreenOrientations

    if (unlockScreenOrientations === true) {
      await screenOrientation.unlock()
    } else {
      await screenOrientation.lock('portrait')
    }
  })


  vue.use(router)
  return { router }
}