import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: true },
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true },
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_API_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const storeAuth = useAuthStore()
  const authUser = storeAuth.loggedInUser
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }

  if (reqAuth && !authUser) {
    storeAuth.getAuthenticatedUserDetails().then(() => {
      if (!authUser) {
        console.log('user needs to login')
        next(loginQuery)
      } else {
        next()
      }
    })
  } else {
    next() // make sure to always call next()!
  }
})

export default router
