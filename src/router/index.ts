import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: '',
        redirect: '/home/library'
      },
      {
        path: 'library',
        component: () => import('@/views/LibraryView.vue')
      },
      {
        path: 'inbox',
        component: () => import('@/views/InboxView.vue')
      },
      {
        path: 'review',
        component: () => import('@/views/ReviewView.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
