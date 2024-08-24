import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/index.vue'
import Menu from '../views/menu/index.vue'
import Home from '../views/home/index.vue'
import Set from '../views/set/index.vue'
import Message from '../views/message/index.vue'

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
      component:Menu,
      children:[{
          name:'home',
          path:'/home',
          component:Home,
        },
        {
          name:'set',
          path:'/set',
          component:Set,
        },{
          name:'message',
          path:'/message',
          component:Message,
        }
      ]
    },

  ]
})

export default router
