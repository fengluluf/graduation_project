<template>
    <div class="tabbar">
        <van-tabbar v-model="active" active-color="#28b8a1" @change="changeTab">
            <van-tabbar-item :icon="item.icon" v-for="(item,key) in tabItem" :key="key">{{item.name}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'Tabbar',
    // props:{
    //     active:{
    //         type: Number,
    //         default: 0
    //     },
    // },
    data () {
        return {
            active:0,
            tabItem:[{icon:'home-o',name:'首页'},
            {icon:'smile-comment-o',name:'分享'},
            {icon:'user-o',name:'我的'}]
        }
    },
    methods:{
        changeTab(active){
            this.active = active;
            this.$emit('on-tabChange', active)
         }, 
    }
}
</script>

<style scoped>
.tabbar{
    overflow: hidden;
}
</style>
