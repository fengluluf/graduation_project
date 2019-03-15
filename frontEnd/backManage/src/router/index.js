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
        {   // 首页
            path: '/home',   
            name:"home",
            component: ()=>import('../service/home/home.vue')
        },
        {   // 用户信息列表
            path: '/userList',   
            name:"userList",
            component: ()=>import('../service/user/userList.vue')
        },
        {   // 用户文章列表
            path: '/userArticle',   
            name:"userArticle",
            component: ()=>import('../service/user/userArticle.vue')
        },
        {   // 轮播图管理
            path: '/bannerManage',   
            name:"bannerManage",
            component: ()=>import('../service/content/bannerManage.vue')
        },
        {   // 首页推荐列表
            path: '/recList',   
            name:"recList",
            component: ()=>import('../service/content/recList.vue')
        },
        {   // 药品列表
            path: '/drugsList',   
            name:"drugsList",
            component: ()=>import('../service/content/drugsList.vue')
        },
        {   // 疾病列表
            path: '/diseaseList',   
            name:"diseaseList",
            component: ()=>import('../service/content/diseaseList.vue')
        },
    ]
})

export default  router;

