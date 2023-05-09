import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'settings',
    component: () => import('@/app/settings/pages/SettingsPage.vue')
  },
  {
    path: 'settings/account',
    component: () => import('@/app/settings/pages/AccountPage.vue'),
  },
  {
    name: 'settings-account-email',
    path: 'settings/account/email',
    component: () => import('@/app/settings/pages/EmailPage.vue'),
  }
]
