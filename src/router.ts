import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import HomePage from '@/app/home/components/HomePage.vue'


import { routes as libraryRoutes } from '@/app/library'
import { routes as inboxDeckRoutes } from '@/app/decks/inbox'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/library'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    children: [
      ...libraryRoutes,
      ...inboxDeckRoutes,
      {
        path: 'review',
        component: () => import('@/app/decks/review/components/ReviewDeckPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/app/settings/components/SettingsPage.vue'),
        children: [
          {
            path: '',
            component: () => import('@/app/settings/components/GeneralSettingsPage.vue')
          },
          {
            path: 'account',
            component: () => import('@/app/settings/components/account/AccountPage.vue'),
          }
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
