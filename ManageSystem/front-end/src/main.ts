import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './stores'
import type { NavigationGuardNext, RouteLocation, RouteLocationNormalized } from 'vue-router'

const app = createApp(App)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

router.beforeEach((to:RouteLocationNormalized,from:RouteLocation,next:NavigationGuardNext)=>{
  const token = localStorage.getItem('token');

  // alert(token);
  if(to.name !== 'login' && !token ) next ({name:'login'});
  else next();
})

// 使用插件
app.use(ElementPlus)
app.use(router)
app.use(pinia);


// 挂载应用
app.mount('#app')