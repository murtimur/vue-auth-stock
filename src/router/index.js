import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/views/signup/SignUp.vue'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import Processes from '@/views/processes/Processes.vue'
import Fatura from '@/views/fatura/Fatura.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/processes',
      name: 'processes',
      component: Processes,
    },
    {
      path: '/fatura',
      name: 'fatura',
      component: Fatura,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'settings']
  const authStore = useAuthStore()
  const isAuthenticated = authStore.auth && Object.keys(authStore.auth).length > 0
  if (!publicPages.includes(String(to.name)) && !isAuthenticated) {
    return next({ name: 'login' })
  }
  next()
})

export default router
