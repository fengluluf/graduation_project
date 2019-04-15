<template>
    <div class="search">
        <Layout :active="active">
            <div slot="header" class="header">
                <div class="header-search">
                    <!-- <van-nav-bar @click-left="onClickLeft" left-arrow ></van-nav-bar> -->
                    <van-icon name="arrow-left" />
                    <van-search v-model="searchTxt" placeholder="搜贴士\疾病\药品" show-action shape="round" @search="onSearch">
                        <div slot="action" @click="onSearch" class="searchBtn">搜索</div>
                    </van-search>
                </div>
            </div>
            <div slot="main" class="main">
                <div class="main-select">
                    <van-tabs v-model="active" color="#28b8a1" background="f5f7f8">
                        <van-tab title="药品">
                            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
                                <van-cell v-for="item in list" :key="item" :title="item" />
                            </van-list>
                        </van-tab>
                        <van-tab title="疾病">内容 2</van-tab>
                        <van-tab title="贴士">内容 3</van-tab>
                    </van-tabs>
                </div>              
                <div class="main-recommend">
                    
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/search.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            active:0,//选中的底部导航
            searchTxt:'',//搜索的内容
            list: [],
            loading: false,
            finished: false
        }
    },
    created() {
        
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1);
        },
        //确定搜索
        onSearch(){

        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 40) {
                this.finished = true;
                }
            }, 500);
        }
    },
}
</script>
<style lang="less">
.header{
    .searchBtn,.van-icon{
        color:#28b8a1;
    }
    .header-search{
        height: 54px;
        line-height: 54px;
    }
    .van-search {
        position: fixed;
        top: 0;
        width: 95%;
        left: 5%;
    }
}
.van-tabs--line .van-tabs__wrap{
    position: fixed!important;
    top: 54px!important;
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);
}
</style>
