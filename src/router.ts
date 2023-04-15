import { RouteRecordRaw } from 'vue-router'
import HomePage from '@/app/home/components/HomePage.vue'


import { routes as libraryRoutes } from '@/app/library'
import { routes as inboxDeckRoutes } from '@/app/decks/inbox'
import { routes as reviewDeckRoutes } from '@/app/decks/review'
import { routes as settingsRoutes } from '@/app/settings'
import { routes as welcomeRoutes } from '@/app/welcome'

const routes: Array<RouteRecordRaw> = [
  ...welcomeRoutes,
  {
    path: '/',
    redirect: '/welcome'
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

export default routes
