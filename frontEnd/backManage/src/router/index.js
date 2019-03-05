import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
    routes: [
        {   // 登录页
            path: '/',   
            name:"login",
            component: ()=>import('../service/login/login.vue')
        },
    ]
})

export default  router;

