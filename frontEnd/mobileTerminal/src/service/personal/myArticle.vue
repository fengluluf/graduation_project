<template>
    <div class="myArticle">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="我的文章" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" :offset="50"
                @load="listUpload"
                class="recommend-list" >
                    <div class="recommend-item" v-for="(item,key) in recommendList" :key="key" @click="goshareDetail(item)">
                        <van-row type="flex" justify="space-around">
                            <van-col span="24">
                                <div class="recTitle">{{item.articleName}}</div>
                                <div class="recCon">{{item.articleTxt}}</div>
                            </van-col>
                        </van-row>
                    </div>
                </van-list>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/personal/myArticle.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            //列表变量
            loading: false,
            finished: true,
            allowLoadMore:true,
            // 推荐列表请求
            recommendData:{ 
                pageNo:1,
                pageSize:10,
            },
            //推荐列表
            recommendList:[]
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
        //请求我发表的文章列表
        recommendRequest(){
            var _this = this;
            var data = {userId:1}
            pageData.recommendRes(data).then(function (res) {
                _this.loading = false;
                if(res.resultcode == "0000") {
                    if(res.data.result == "00"){
                        _this.recommendList = res.data.array
                    }else{
                        _this.$toast(res.data.text);
                    }
                }else{
                     _this.$toast(res.data.text);
                 }
            })
        },
        //进入分享详情
        goshareDetail(item){
            this.$router.push({path:'/shareDetail',query:{id:item.id}});
        }
    },
}
</script>
<style scoped lang="less">
.header{
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
}
.van-icon{
    color: #28b8a1
}
.main{   
    color: #7d7e80;
    .recommend-title{
        padding:0 10px;
        line-height: 40px;
        border-bottom:1px solid #f5f7f8;
        background-color: #fff;
    }
    .recommend-list{  
        word-break: break-all;
        .recommend-item{
            border-bottom:1px solid #f5f7f8;
            padding:0 10px;
            background-color: #fff;
        }
        .recTitle{
            font-weight: bold;
            font-size: 15px;
            line-height: 25px;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            padding:5px 0;
        }
        .recCon{
            font-size: 12px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; 
            color:#7d7e80
        }
        .recImg{
            width: 100%;
            height:80px;
            padding-top:5px;
        }
    }
}
</style>
