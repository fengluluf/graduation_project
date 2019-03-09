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
        {   // 重置密码
            path: '/forgetPwd',   
            name:"forgetPwd",
            component: ()=>import('../service/login/forgetPwd.vue')
        },
        {   // 注册页面
            path: '/register',   
            name:"register",
            component: ()=>import('../service/login/register.vue')
        },
        {   // 主页
            path: '/home',   
            name:"home",
            component: ()=>import('../service/home/home.vue'),
            meta:{
                needTab:true
            }
        },
        {   // 健康贴士详情
            path: '/tipsDetail',   
            name:"tipsDetail",
            component: ()=>import('../service/home/tipsDetail.vue'),
        },
        {   // 分享
            path: '/share',   
            name:"share",
            component: ()=>import('../service/share/share.vue'),
            meta:{
                needTab:true
            }
        },
        {   // 我的
            path: '/personal',   
            name:"personal",
            component: ()=>import('../service/personal/personal.vue'),
            meta:{
                needTab:true
            }
        },
    ]
})

export default  router;

