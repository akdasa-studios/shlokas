import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import HomePage from '@/app/home/components/HomePage.vue'

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
      {
        path: 'library',
        component: () => import('@/app/library/components/LibraryPage.vue')
      },
      {
        path: 'inbox',
        component: () => import('@/app/decks/inbox/components/InboxDeckPage.vue')
      },
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
