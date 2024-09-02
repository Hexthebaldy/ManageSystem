import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/index.vue'
import Menu from '../views/menu/index.vue'
import Home from '../views/home/index.vue'
import Set from '../views/set/index.vue'
import Message from '../views/message/index.vue'
import Overview from '../views/overview/index.vue'
import UserManage from '../views/user_manage/users_manage/index.vue'
import ProductManage from '../views/user_manage/product_manage/index.vue'
import MessageManage from '../views/user_manage/message_manage/index.vue'
import UserList from '../views/user_manage/user_list/index.vue'
import ProductListManage from '../views/product/product_manage_list/index.vue'
import File from '../views/file/index.vue'
import Log from '../views/login_log/index.vue'
import Operation from '../views/operation_log/index.vue'

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
        },{
          name:'overview',
          path:'/overview',
          component:Overview,
        },{
          name:'users_manage',
          path:'/users_manage',
          component:UserManage,
        },{
          name:'product_manage',
          path:'/product_manage',
          component:ProductManage,
        },{
          name:'message_manage',
          path:'/message_manage',
          component:MessageManage
        },{
          name:'user_list',
          path:'/user_list',
          component:UserList
        },{
          name:'product_list_manage',
          path:'/product_list_manage',
          component:ProductListManage
        },{
          name:'file',
          path:'/file',
          component:File
        },{
          name:'log',
          path:'/log',
          component:Log
        },{
          name:'operation',
          path:'/operation',
          component:Operation
        },
        
      ]
    },

  ]
})

export default router
