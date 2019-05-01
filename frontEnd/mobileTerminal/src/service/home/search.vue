<template>
    <div class="search">
        <Layout :active="active">
            <div slot="header" class="header">
                <div class="header-search">
                    <!-- <van-nav-bar @click-left="onClickLeft" left-arrow ></van-nav-bar> -->
                    <van-icon name="arrow-left" @click="onClickLeft"/>
                    <van-search v-model="searchTxt" placeholder="搜贴士\疾病\药品" show-action shape="round" @focus="onSearch">
                        <div slot="action" @click="getSearchList" class="searchBtn">搜索</div>
                    </van-search>
                </div>
            </div>
            <div slot="main" class="main">
                <div class="main-select" v-if="showSelect">
                    <van-tabs v-model="active" color="#28b8a1" background="f5f7f8" @click="getSearchList()">
                        <van-tab title="药品">
                            <van-list finished-text="没有更多了">
                                <van-cell v-for="(item,key) in drugList" :key="key" :title="item.drugName" @click="goDetail(item.id)"/>
                            </van-list>
                        </van-tab>
                        <van-tab title="疾病">
                            <van-list finished-text="没有更多了">
                                <van-cell v-for="(item,key) in diseaseList" :key="key" :title="item.diseaseName" @click="goDetail(item.id)"/>
                            </van-list>
                        </van-tab>
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
            showSelect:false,//是否显示搜索选项
            drugList: [],//药品列表
            diseaseList:[],//疾病列表
            articleList:[],//文章列表
        }
    },
    created() {
    },
    watch:{
        $route(to, from){
            const fromDepth = from.name;         
            if(fromDepth == "home"){
                this.drugList = [];
                this.diseaseList = [];
                this.articleList = [];
                this.showSelect = false;
                this.searchTxt = ""
            }
        },
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1);
            console.log("111111111111")
        },
        //搜索框获取焦点
        onSearch(){
            if(this.showSelect){
                this.showSelect = false;
            }
        },
        //点击搜索，获取药品列表
        getSearchList(){
            this.drugList = [];
            var _this = this;
            var data = {str:this.searchTxt}
            if(this.searchTxt==''){
                this.$toast("请输入搜索内容！")
                return false;
            }else{
                this.showSelect = true;
            }
            if(this.active == 0){
                pageData.searchDrug(data).then(function(res){
                    if(res.resultcode=="0000"){
                        if(res.data.result=="00"){
                            _this.drugList = res.data.arr
                        }else{
                            _this.$toast(res.data.text)
                        }
                    }else{
                        _this.$toast(res.data.text);
                    }
                })
            }else if(this.active == 1){
                pageData.searchDisease(data).then(function(res){
                    if(res.resultcode=="0000"){
                        if(res.data.result=="00"){
                            _this.diseaseList = res.data.arr
                        }else{
                            _this.$toast(res.data.text)
                        }
                    }else{
                        _this.$toast(res.data.text);
                    }
                })
            }else if(this.active == 2){
                this.$toast("无此类文章")
            }
        },
        //进入药品、疾病详情页
        goDetail:function(itemID){
            if(this.active == 0){
                this.$router.push({path:'/drugsDetail',query:{id:itemID}});
            }else if(this.active == 1){
                this.$router.push({path:'/diseaseDetail',query:{id:itemID}});
            }else if(this.active == 2){
                console.log("bbbbbbb")
            }
        },
    },
}
</script>
<style lang="less">
.header{
    .searchBtn,.van-icon{
        color:#28b8a1;
        margin-left: 10px;
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
