<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <Tabbar v-if="$route.meta.needTab" @on-tabChange="changeTab"></Tabbar>
    </div>
</template>

<script>
import Tabbar from "./components/tabbar.vue"
export default {
    components:{Tabbar},
    name: 'App',
    methods: {
        changeTab(active){
            if(active==0){
                this.$router.push('/home');
            }else if(active==1){
                this.$router.push('/share');
            }else if(active==2){
                this.$router.push('/personal');
            }
        }
    },
}
</script>

<style>
*{
    box-sizing: border-box;
    padding:0;
    margin:0;
    font-family: STXihei;
    
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;/*px*/
    margin:0;
    padding:0;
    height:100%;
    /* overflow-y: auto; */
}
html, body {
    height: 100%;
    padding:0;
    margin:0;
    overflow: hidden;
}
.van-dialog__message{
    font-size: 18px;
}
.van-dialog__confirm, .van-dialog__confirm:active{
    color: #28b8a1;
}
</style>
