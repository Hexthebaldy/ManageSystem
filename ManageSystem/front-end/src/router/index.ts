import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/index.vue'
import Menu from '../views/menu/index.vue'
import Home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      name:'login',
      path:'/login',
      component:Login
    },
    {
      name:'menu',
      path:'/menu',
      component:Menu
    },
    {
      name:'home',
      path:'/path',
      component:Home
    }
  ]
})

export default router
