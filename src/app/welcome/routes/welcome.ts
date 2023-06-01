import { RouteRecordRaw } from 'vue-router'
import { useSettingsStore } from '@/app/settings'


export const routes: Array<RouteRecordRaw> = [
  {
    name: 'welcome',
    path: '/welcome',
    component: () => import('../pages/WelcomePage.vue'),
    beforeEnter: () => {
      const settings = useSettingsStore()
      if (settings.welcomeDone) { return '/home/library' }
    },
  },
  {
    name: 'welcome-email',
    path: '/welcome/email',
    component: () => import('@/app/settings/pages/EmailPage.vue'),
    props: _ => ({
      nextUrl: '/home/library',
      navigationType: 'replace'
    })
  }
]
