import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    name: 'library',
    path: 'library',
    component: () => import('../pages/LibraryPage.vue'),
  },
  {
    name: 'library:verse',
    path: 'library/verses/:id',
    component: () => import('../pages/VersePage.vue'),
    props: route => ({
      id: route.params.id,
    }),
  },
]
