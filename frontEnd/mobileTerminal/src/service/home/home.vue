<template>
    <div class="home">
        <Layout :active="active">
            <div slot="header">
                <div class="header-search">
                    <van-search v-model="searchTxt" placeholder="搜索症状\疾病\药品" show-action shape="round" @search="onSearch">
                        <div slot="action" @click="onSearch" class="searchBtn">搜索</div>
                    </van-search>
                </div>
            </div>
            <div slot="main">
                <div class="main-banner">
                    <van-swipe :autoplay="3000" indicator-color="white">
                        <!-- <van-swipe-item v-for="(item,key) in swipeList" :key="key">
                            <img :src="item.imageUrl" alt="" class="swipeImg">
                        </van-swipe-item> -->
                        <van-swipe-item>
                            <img src="../../assets/images/banner1.jpg" alt="" class="swipeImg" @click="gotipsDetail(1)">
                        </van-swipe-item>
                        <van-swipe-item>
                            <img src="../../assets/images/banner2.jpg" alt="" class="swipeImg" @click="gotipsDetail(2)">
                        </van-swipe-item>
                        <van-swipe-item>
                            <img src="../../assets/images/banner3.jpg" alt="" class="swipeImg" @click="gotipsDetail(3)">
                        </van-swipe-item>
                    </van-swipe>
                </div>              
                <div class="main-sort">
                    <van-row type="flex" justify="space-around">
                        <van-col span="8" v-for="(item,key) in sortList" :key="key">
                            <span :class="['iconfont',item.icon]" @click="getSortRec(item.fileName)"></span>
                            <div class="sort-name">{{item.name}}</div>
                        </van-col>
                    </van-row>
                </div>
                <div class="main-recommend">
                    <div class="recommend-title">{{recommendTitle}}</div>
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" :offset="50"
                    @load="listUpload"
                    class="recommend-list" >
                        <div class="recommend-item" v-for="(item,key) in recommendList" :key="key" @click="gotipsDetail(key)">
                            <van-row type="flex" justify="space-around">
                                <van-col span="16">
                                    <div class="recTitle">{{item.title}}</div>
                                    <div class="recCon">{{item.con}}</div>
                                </van-col>
                                <van-col span="8">
                                    <img src="../../assets/images/img1.jpg" alt="" class="recImg">
                                </van-col>
                            </van-row>
                        </div>
                    </van-list>
                </div>
            </div>
            <div slot="footer"></div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/home.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            active:0,//选中的底部导航
            searchTxt:'',//搜索的内容
            loading: false,
            finished: false,
            allowLoadMore:true,
            //banner列表
            swipeList:[{id:'0',imageUrl:'../../assets/images/banner1.jpg'},
                {id:'1',imageUrl:'../../assets/images/banner2.jpg'},
                {id:'2',imageUrl:'../../assets/images/banner3.jpg'}],
            recommendTitle:"推荐",//推荐列表名称
            //分类列表
            sortList:[{id:'0',icon:"icon-yaoxiang",name:"找药品",fileName:'findDrugs'},
                {id:'1',icon:"icon-dingdan",name:"查疾病",fileName:'findDisease'},
                {id:'2',icon:"icon-bianji",name:"健康贴士",fileName:'healthArticle'}],
            // 推荐列表请求
            recommendData:{ 
                pageNo:1,
                pageSize:10,
            },
            //推荐列表
            recommendList:[{},{},{title:'带您走近传说中的“天山雪莲”',con:'对于天山雪莲，很多人的第一印象大概停留在武侠小说里，但今天，让小编带大家从中医药的角度来了解天山雪莲以及与“雪莲”相关的种种吧。',banner:''},
            {title:'中药降压靠谱不靠谱？',con:'中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药',banner:''},
            {title:'“步行的学问”有多深？千万别荒废走路的“洪荒之力”！',con:'步行运动在大众中最容易普及，有利于健康又饶有趣味。中国居民膳食指南指出：中国居民每天的活动量达到6000步，'}]
        }
    },
    created() {
        
    },
    methods: {
        //确定搜索
        onSearch(){

        },
        //滚动条与底部距离小于 offset 时触发
        listUpload(){
            if(this.allowLoadMore) {
                this.recommendData.pageNo++;
                this.recommendRequest();
                this.allowLoadMore = false;
            }
            setTimeout(() => {
                this.allowLoadMore = true
            }, 2000);
        },
        //请求推荐列表
        recommendRequest(){
            var _this = this;
            pageData.recommendRes(this.recommendData).then(function (res) {
                _this.loading = false;
                if(res.resultCode == 200) {
                    if(!res.resultJson.pageContent.length){
                       _this.finished = true;
                       return;
                    }
                    if(res.resultJson.pageNum === 1) {
                        _this.recommendList = res.resultJson.pageContent;
                    } else {
                        for(var i=0;i<res.resultJson.pageContent.length;i++){
                            if(JSON.stringify(_this.recommendList).indexOf(JSON.stringify(res.resultJson.pageContent[i])) == -1){
                                _this.recommendList = _this.recommendList.concat(res.resultJson.pageContent);
                            }
                        }
                    }
                    _this.allowLoadMore = true;
                }else{
                     _this.$toast(res.resultMessage);
                 }
            })
        },
        //点击banner
        gotipsDetail(item){
            this.$router.push({path:'/tipsDetail',query:{id:item}});
        },
        //根据分类获取列表
        getSortRec(item){
            // this.recommendTitle = item.name
            this.$router.push(item)
        }
    },
}
</script>
<style scoped lang="less">
.searchBtn{
    color:#28b8a1
}
.main-banner{
    margin-top:10px;
    .swipeImg{
        width:100%;
        height:175px;
    }
}
.main-sort {
    background-color: #fff;
    margin-top:10px;
    .van-col{
        text-align: center;
        .iconfont{
            font-size: 50px;
            color:#28b8a1;
        }
        .sort-name{
            font-size: 14px;
            color: #7d7e80;
        }
    }
}
.main-recommend{
    margin-top:10px;
    background-color: #fff;
    color: #7d7e80;
    .recommend-title{
        padding:0 10px;
        line-height: 40px;
        border-bottom:1px solid #f5f7f8;
    }
    .recommend-list{
        padding:0 10px;
        word-break: break-all;
        .recommend-item{
            border-bottom:1px solid #f5f7f8;
        }
        .recTitle{
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        .recCon{
            font-size: 12px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; 
        }
        .recImg{
            width: 100%;
            height:80px;
            padding-top:5px;
        }
    }
}
</style>
