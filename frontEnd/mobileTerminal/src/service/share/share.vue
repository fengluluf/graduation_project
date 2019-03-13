<template>
    <div class="share">
        <Layout :active="active">
            <div slot="header" class="header">
                <van-nav-bar title="分享" :right-text="rightText" @click-right="onClickRight">
                    <van-icon name="edit" slot="right" v-if="!isShowEdit"/>
                </van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="shareTitle" v-show="isShowEdit">
                    <input placeholder="请输入标题(2-30)" type="text" class="shareInput" v-model="shareReqData.title">
                </div>
                <div class="shareDetail" v-show="isShowEdit">
                    <div contenteditable="true" ref="editor" 
                        @focus="focusEditor" 
                        @blur="blurEditor"
                        @input="changeEditor" class="content" placeholder="请输入正文......">
                    </div>
                </div>
                <div class="main-recommend">
                    <div class="recommend-title">推荐</div>
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" :offset="50"
                    @load="listUpload"
                    class="recommend-list" >
                        <div class="recommend-item" v-for="(item,key) in recommendList" :key="key" @click="goshareDetail(item)">
                            <van-row type="flex" justify="space-around">
                                <van-col span="24">
                                    <div class="recTitle">{{item.title}}</div>
                                    <div class="recCon">{{item.con}}</div>
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
import pageData from "../../api/share/share.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            active:1,//选中的底部导航
            shareReqData:{ // 文章发布内容
                title:"", // 文章标题
                shareContent:"", 
            },
            contentTip:true,
            isShowEdit:false,//是否显示编辑框
            rightText:'',//头部右侧按钮文字
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
            recommendList:[{title:'带您走近传说中的“天山雪莲”',con:'对于天山雪莲，很多人的第一印象大概停留在武侠小说里，但今天，让小编带大家从中医药的角度来了解天山雪莲以及与“雪莲”相关的种种吧。',banner:''},
            {title:'中药降压靠谱不靠谱？',con:'中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药',banner:''},
            {title:'“步行的学问”有多深？千万别荒废走路的“洪荒之力”！',con:'步行运动在大众中最容易普及，有利于健康又饶有趣味。中国居民膳食指南指出：中国居民每天的活动量达到6000步，'},
            {title:'带您走近传说中的“天山雪莲”',con:'对于天山雪莲，很多人的第一印象大概停留在武侠小说里，但今天，让小编带大家从中医药的角度来了解天山雪莲以及与“雪莲”相关的种种吧。',banner:''},
            {title:'中药降压靠谱不靠谱？',con:'中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药',banner:''},
            {title:'“步行的学问”有多深？千万别荒废走路的“洪荒之力”！',con:'步行运动在大众中最容易普及，有利于健康又饶有趣味。中国居民膳食指南指出：中国居民每天的活动量达到6000步，'},
            {title:'带您走近传说中的“天山雪莲”',con:'对于天山雪莲，很多人的第一印象大概停留在武侠小说里，但今天，让小编带大家从中医药的角度来了解天山雪莲以及与“雪莲”相关的种种吧。',banner:''},
            {title:'中药降压靠谱不靠谱？',con:'中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药',banner:''},
            {title:'“步行的学问”有多深？千万别荒废走路的“洪荒之力”！',con:'步行运动在大众中最容易普及，有利于健康又饶有趣味。中国居民膳食指南指出：中国居民每天的活动量达到6000步，'}]
        }
    },
    created() {
        
    },
    methods: {
        onClickRight() {//发布文章
            this.isShowEdit = !this.isShowEdit;
            var _this = this;
            if(this.isShowEdit){
                this.rightText = '发布'
                
            }else{
                this.rightText = '';
                var data = {
                    title:this.shareReqData.title,
                    shareContent:this.shareReqData.shareContent
                };
                pageData.publishRes(data).then(function (d) {
                    if(d.resultCode == 200) {
                        _this.isShowEdit = false
                    }
                }) 
            }
        },
        focusEditor(){  // 编辑器获取焦点
            this.contentTip = false;
        },
        blurEditor(){  // 编辑器失去焦点
            if(!this.shareReqData.shareContent){
                 this.contentTip = true;
            }
        },
        changeEditor(){ // 编辑器change事件
           this.shareReqData.shareContent =  this.$refs.editor.innerHTML;
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
        //进入分享详情
        goshareDetail(item){
            this.$router.push({path:'/shareDetail',query:{id:item.id}});
        }
    },
}
</script>
<style scoped lang="less">
.van-icon{
    color:#28b8a1
}
.header{
    .van-nav-bar__text{
        color: #28b8a1;
    }
}
.main{
    .shareTitle{
        height: 40px;
        line-height: 50px;
        input{
            border:none;
            width:100%;
            height:35px;
            outline: none;
            font-size: 16px;/*px*/
            font-weight: bold;
            text-indent: 5px;
            border-bottom:1px solid #d8d8d8;/*no*/

        }
        input::-webkit-input-placeholder{
            font-size: 16px;/*px*/
            font-weight: bold
        }
    }
    .shareDetail{
        margin-top:10px;
        .content{
            width:100%;
            height:200px;
            padding:10px;
            overflow-y:scroll;
            overflow-scrolling: touch;
            border:1px solid rgb(214, 214, 214);
            outline: none;
            background:#fff;
            text-indent: 26px;
            #tip{
               color:rgb(143, 143, 143);
            }
        }
        .content:empty:before{
            content: attr(placeholder);
            color:rgb(143, 143, 143);
            margin-left:-26px;
        }
        .content:focus:before{
            content:none;
        }
    }
    .main-recommend{
        margin-top:10px;
        
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
                // color:#000;
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
}
</style>
