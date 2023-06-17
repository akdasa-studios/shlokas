import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    name: 'reviewDeck',
    path: 'review',
    component: () => import('../pages/ReviewDeckPage.vue'),
    meta: {
      unlockScreenOrientations: true
    }
  },
]
