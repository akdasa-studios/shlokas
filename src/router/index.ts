import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/app/home/views/HomePage.vue'

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
        component: () => import('@/app/library/views/LibraryPage.vue')
      },
      {
        path: 'inbox',
        component: () => import('@/app/inbox/views/InboxPage.vue')
      },
      {
        path: 'review',
        component: () => import('@/app/review/views/ReviewPage.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
