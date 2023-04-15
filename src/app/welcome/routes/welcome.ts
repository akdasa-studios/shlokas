import { useSettingsStore } from '@/app/settings'
import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    name: 'welcome',
    path: '/welcome',
    component: () => import('../pages/WelcomePage.vue'),
    beforeEnter: () => {
      const settings = useSettingsStore()
      if (settings.welcome.done) { return '/home/library' }
    },
  },
]
