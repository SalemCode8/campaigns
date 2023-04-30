import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: () => import('../views/CampaignsView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/errors/404.vue'),
    }
  ]
})

export default router
