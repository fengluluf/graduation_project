<template>
    <div class="aside">
        <el-row class="tac">
            <el-col>
                <el-menu :default-openeds="['1', '2']" :default-active="$router.path" router class="el-menu-vertical-demo" @open="handleOpen" @select="selectMenu" :unique-opened="isUnique">                
                    <template v-for="(item,key) in menu">
                        <el-menu-item :index="item.path" v-if="!item.childMenu" :key="key">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </el-menu-item>
                        <el-submenu :index="item.path" :key="key" v-else>
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{item.title}}</span>
                            </template>
                            <template v-for="(sub,key) in item.childMenu">
                                <el-menu-item :index="sub.path" :key="key">{{sub.title}}</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
        isUnique:true,
        menu:[
            {
                title:"首页",
                icon:"el-icon-menu",
                path:"/home"
            },
            {
                title:"用户管理",
                icon:"el-icon-menu",
                path:"user",
                childMenu:[
                    {
                        title:"用户信息列表",
                        icon:"",
                        path:"/userList"
                    },
                    {
                        title:"用户文章列表",
                        icon:"",
                        path:"/userArticle"
                    },
                ]
            },
            {
                title:"内容管理",
                icon:"el-icon-news",
                path:"content",
                childMenu:[
                    {
                        title:"轮播图管理",
                        icon:"",
                        path:"/bannerManage"
                    },
                    {
                        title:"首页推荐列表",
                        icon:"",
                        path:"/recList"
                    },
                    {
                        title:"药品一级分类管理",
                        icon:"",
                        path:"/drugsManageFir"
                    },
                    {
                        title:"药品二级分类管理",
                        icon:"",
                        path:"/drugsManageSec"
                    },
                    {
                        title:"药品列表",
                        icon:"",
                        path:"/drugsList"
                    },
                    {
                        title:"疾病一级分类管理",
                        icon:"",
                        path:"/diseaseManageFir"
                    },
                    {
                        title:"疾病二级分类管理",
                        icon:"",
                        path:"/diseaseManageSec"
                    },
                    {
                        title:"疾病列表",
                        icon:"",
                        path:"/diseaseList"
                    },
                ]
            },
        ],
    };
  },
  methods:{
      //sub-menu展开
      handleOpen(key,keyPath){
        //   console.log(key,keyPath)
      },
      //菜单激活
      selectMenu(key,keyPath){
        //   console.log(key,keyPath)
      }
  }
};
</script>

<style scoped>
.aside{
    overflow-x: hidden;
    background-color: #D3DCE6;
}
</style>
