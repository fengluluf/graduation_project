<template>
    <div id="app">
        <el-container>
            <el-container v-if="!layout">
                <router-view></router-view>
            </el-container>
            <template v-else>
                <el-container>
                    <el-aside width="200px"><Aside></Aside></el-aside>
                    <el-container>
                        <el-header><Header :userName="userName"></Header></el-header>
                        <el-main>
                            <router-view/>
                        </el-main>  
                    </el-container>
                </el-container>
            </template>
        </el-container>
    </div>
</template>

<script>
import Header from './components/header/header.vue'
import Aside from './components/aside/aside.vue'
export default {
  name: 'App',
  components: {Header,Aside},
    data(){
        return {
            layout: true,
            userName:''
        }
    },
    watch: {
        '$route': function(to, from){
            if(to.path=='/'){
                this.layout = false;
            }else{
                this.layout = true;
            }
        }
    },
    created(){
        this.userName = sessionStorage.getItem("userName");
    }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin:0;
    padding:0;
    height:100%;
  }
  .el-header {
    background-color: #fff;
    border-bottom: 1px solid #d8dce5;
    color: #333;
    line-height: 60px;
    color:#fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
  
  .el-aside {
    color: #333;
    background-color: rgb(48, 65, 86);
    border-right:1px solid #d3d3d3
  }
  .el-aside .tac{
      height:100%
  }

  .el-main {
      color: #333;
      padding:10px;
  }
  .el-menu{
      background-color:rgb(48, 65, 86);
  }
  .el-menu-item{
      color:rgb(191, 203, 217);
  }
  .el-menu-item.is-active{
      background-color: transparent;
  }
  .el-submenu__title{
      color:rgb(191, 203, 217);
  }
  html, body {
      height: 100%;
  }
  #app .el-container {
      height: 100%;
  }
</style>
