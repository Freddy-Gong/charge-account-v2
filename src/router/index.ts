import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '../views/Money.vue'
import Chart from '@/views/Chart.vue'
import NoMatch from '@/views/NoMatch.vue'
import Number from '@/views/Money/Number.vue'



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Money',
    component: Money
  },
  {
    path: '/Chart',
    name: 'Chart',
    component: Chart
  },
  {
    path: "/number",
    name: 'Number',
    component: Number
  },
  {
    path: '/*',
    name: 'NoMatch',
    component: NoMatch
  }
]

const router = new VueRouter({
  routes
})

export default router
