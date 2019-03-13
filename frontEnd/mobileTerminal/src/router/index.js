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
                needTab:true,
                keepAlive:true
            }
        },
        {   // 健康贴士详情
            path: '/tipsDetail',   
            name:"tipsDetail",
            component: ()=>import('../service/home/tipsDetail.vue'),
        },
        {   // 找药品
            path: '/findDrugs',   
            name:"findDrugs",
            component: ()=>import('../service/home/findDrugs.vue'),
            meta:{
                keepAlive:true
            }
        },
        {   // 药品详情
            path: '/drugsDetail',   
            name:"drugsDetail",
            component: ()=>import('../service/home/drugsDetail.vue'),
        },
        {   // 查疾病
            path: '/findDisease',   
            name:"findDisease",
            component: ()=>import('../service/home/findDisease.vue'),
            meta:{
                keepAlive:true
            }
        },
        {   // 疾病详情
            path: '/diseaseDetail',   
            name:"diseaseDetail",
            component: ()=>import('../service/home/diseaseDetail.vue'),
        },
        {   // 健康贴士文章
            path: '/healthArticle',   
            name:"healthArticle",
            component: ()=>import('../service/home/healthArticle.vue'),
        },
        {   // 分享
            path: '/share',   
            name:"share",
            component: ()=>import('../service/share/share.vue'),
            meta:{
                needTab:true
            }
        },
        {   // 分享详情
            path: '/shareDetail',   
            name:"shareDetail",
            component: ()=>import('../service/share/shareDetail.vue'),
        },
        {   // 我的
            path: '/personal',   
            name:"personal",
            component: ()=>import('../service/personal/personal.vue'),
            meta:{
                needTab:true
            }
        },
        {   // 我的收藏
            path: '/myCollect',   
            name:"myCollect",
            component: ()=>import('../service/personal/myCollect.vue'),
            meta:{
                keepAlive:true
            }
        },
        {   // 我的文章
            path: '/myArticle',   
            name:"myArticle",
            component: ()=>import('../service/personal/myArticle.vue'),
            meta:{
                keepAlive:true
            }
        },
    ]
})

export default  router;

