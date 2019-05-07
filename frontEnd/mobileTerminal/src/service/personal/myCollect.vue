<template>
    <div class="myCollect">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="我的收藏" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <van-tabs v-model="active" color="#28b8a1">
                    <van-tab title="健康贴士">
                        <van-list v-model="healthLoading" :finished="healthFinished" finished-text="没有更多了" :immediate-check="false" :offset="50"
                        @load="listUpload"
                        class="health-list" >
                            <div class="health-item" v-for="(item,key) in healthList" :key="key" @click="gohealthDetail(item)">
                                <van-row type="flex" justify="space-around">
                                    <van-col span="16">
                                        <div class="healthTitle">{{item.title}}</div>
                                        <div class="healthCon">{{item.con}}</div>
                                    </van-col>
                                    <van-col span="8">
                                    <img src="../../assets/images/img1.jpg" alt="" class="healthImg">
                                </van-col>
                                </van-row>
                            </div>
                        </van-list>
                    </van-tab>
                    <van-tab title="他人分享">
                        <van-list v-model="shareLoading" :finished="shareFinished" finished-text="没有更多了" :immediate-check="false" :offset="50"
                        @load="listUpload"
                        class="share-list" >
                            <div class="share-item" v-for="(item,key) in shareList" :key="key" @click="goshareDetail(item)">
                                <van-row type="flex" justify="space-around">
                                    <van-col span="24">
                                        <div class="shareTitle">{{item.articleName}}</div>
                                        <div class="shareCon">{{item.articleTxt}}</div>
                                    </van-col>
                                </van-row>
                            </div>
                        </van-list>
                    </van-tab>
                </van-tabs>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/personal/myCollect.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/tipsDetail"||from.path=="shareDetail"){
                vm.$children[0].$refs.main.scrollTop = vm.listscrollTops;
            }else{
                vm.listscrollTops=0;
            }
        });
    },
    data() {
        return {
            listscrollTops:'',
            active:0,
            //列表变量
            healthLoading: false,
            healthFinished: true,
            healthAllowLoadMore:true,
            // 推荐列表请求
            healthData:{ 
                pageNo:1,
                pageSize:10,
            },
            //推荐列表
            healthList:[{title:'带您走近传说中的“天山雪莲”',con:'对于天山雪莲，很多人的第一印象大概停留在武侠小说里，但今天，让小编带大家从中医药的角度来了解天山雪莲以及与“雪莲”相关的种种吧。',banner:''}],
            //列表变量
            shareLoading: false,
            shareFinished: true,
            shareAllowLoadMore:true,
            // 推荐列表请求
            shareData:{ 
                pageNo:1,
                pageSize:10,
            },
            //推荐列表
            shareList:[{title:'带您走近传说中的“天山雪莲”',con:'对于天山雪莲，很多人的第一印象大概停留在武侠小说里，但今天，让小编带大家从中医药的角度来了解天山雪莲以及与“雪莲”相关的种种吧。',banner:''},
            {title:'中药降压靠谱不靠谱？',con:'中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药',banner:''}]
        }
    },
    created() {
        this.recommendRequest()
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
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
            var data = {userId:1}
            pageData.recommendRes(data).then(function (res) {
                _this.loading = false;
                if(res.resultcode == "0000") {
                    if(res.data.result == "00"){
                        _this.shareList = res.data.array
                    }else{
                        _this.$toast(res.data.text);
                    }
                }else{
                     _this.$toast(res.data.text);
                }
            })
        },
        //进入分享详情
        gohealthDetail(item){
            this.$router.push({path:'/shareDetail',query:{id:item.id}});
            this.listscrollTops = this.$children[0].$refs.main.scrollTop;
        },
        //进入分享详情
        goshareDetail(item){
            this.$router.push({path:'/shareDetail',query:{id:item.id}});
            this.listscrollTops = this.$children[0].$refs.main.scrollTop;
        }
    },
}
</script>
<style scoped lang="less">
.van-icon{
    color: #28b8a1
}
.header{
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
}
.main{
    .van-tab{
        border-right: 1px solid #d8d8d8;
    }
    .health-list{
        padding:0 10px;
        word-break: break-all;
        background-color: #fff; 
       .health-item{
            border-bottom:1px solid #f5f7f8;
        }
        .healthTitle{
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        .healthCon{
            font-size: 12px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; 
        }
        .healthImg{
            width: 100%;
            height:80px;
            padding-top:5px;
        }
    }
    .share-list{
        padding:0 10px;
        word-break: break-all;
        background-color: #fff; 
       .share-item{
            border-bottom:1px solid #f5f7f8;
        }
        .shareTitle{
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        .shareCon{
            font-size: 12px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; 
        }
    }
}
</style>
