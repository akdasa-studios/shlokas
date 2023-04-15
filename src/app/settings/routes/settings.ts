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
    path: 'settings/account/email/register',
    component: () => import('@/app/settings/pages/account/SignUpViaEmailPage.vue'),
  },
  {
    path: 'settings/account/email/login',
    component: () => import('@/app/settings/pages/account/LogInViaEmailPage.vue'),
  }
]
