import type { NavigationGuardNext, RouteLocation, RouteLocationNormalized } from 'vue-router'
import router from './router/index'

router.beforeEach((to:RouteLocationNormalized,from:RouteLocation,next:NavigationGuardNext)=>{
    const token = localStorage.getItem('token');

    alert(token);
    if(to.name !== 'login' && !token ) next ({name:'login'});
    else next();
})