import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import HomePage from '@/app/home/components/HomePage.vue'


import { routes as libraryRoutes } from '@/app/library'
import { routes as inboxDeckRoutes } from '@/app/decks/inbox'
import { routes as reviewDeckRoutes } from '@/app/decks/review'
import { routes as settingsRoutes } from '@/app/settings'

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
      ...reviewDeckRoutes,
      ...settingsRoutes,
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
