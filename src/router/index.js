import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/journal',
    name: 'journal',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Journal.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/banks',
    name: 'banks',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Banks.vue')
  },
  {
    path: '/cash',
    name: 'cash',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Cash.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/DetailRecord.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(routeRecord => routeRecord.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})
export default router
