import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    name: 'inboxDeck',
    path: 'inbox',
    component: () => import('../pages/InboxDeckPage.vue'),
    meta: {
      unlockScreenOrientations: true
    }
  },
]
