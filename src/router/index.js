import Vue from 'vue'
import VueRouter from 'vue-router'
const Event  = () => import('../views/event.vue')
const Click  = () => import('../views/click.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Click',
    component: Click
  },
  {
    path: '/event',
    name: 'Event',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Event
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
