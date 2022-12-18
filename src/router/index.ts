import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/pages/HomePage.vue'

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
        component: () => import('@/views/pages/library/LibraryPage.vue')
      },
      {
        path: 'inbox',
        component: () => import('@/views/pages/inbox/InboxPage.vue')
      },
      {
        path: 'review',
        component: () => import('@/views/pages/review/ReviewPage.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
