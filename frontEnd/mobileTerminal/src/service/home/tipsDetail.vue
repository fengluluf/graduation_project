<template>
    <div class="tipsDetail">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar :title="title" @click-left="onClickLeft" left-arrow >
                </van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="main-article">
                    <div class="article-title">{{articleTitle}}</div>
                    <!-- <div class="article-time">{{articleTime}}</div> -->
                    <div class="article-con" v-html="articleCon"></div>
                </div>
                <div class="main-comment">
                    <transition name="commentAnimate">
                        <div v-show="isShowTitle" class="commentTitle">全部评论 ({{commentsListData.count || 0}})</div>
                    </transition>
                    <div class="article-comments">
                        <div class="title" id="allComment" ref="comment">全部评论 ({{commentsListData.count || 0}})</div>
                        <div  class="commentList">
                                <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                :immediate-check="false"
                                :offset="50"
                                @load="listUpload"
                            >
                            <div v-if="commentList.length" class="commentItem" v-for="(item,index) in commentList" :key="index">
                                    <div class="userHeader">
                                        <div class="portrait">
                                            <!-- <img :src="item.editorHeadImg" alt=""> -->
                                            <img src="../../assets/images/head/-.png" alt="">
                                        </div>
                                        <div class="userMsg">
                                            <div class="userName">{{item.editorName}}</div>
                                            <div>{{item.createDate}}</div>
                                        </div>
                                    </div>
                                    <div class="commentContent">
                                        <p class="mainComment">{{item.content}}</p>
                                    </div>
                            </div>
                            </van-list>    
                        </div>
                    </div>
                </div>
                
            </div>
            <div slot="footer" class="footer">
                <div class="btnCenter">
                    <ul class="btnUl" :id="isFocus?'focusClass':''">
                        <li class="inpComment">
                            <van-icon name="edit" v-show="!isFocus"/>
                            <textarea @focus="commentFocusBlur(true)" 
                                    @blur="commentFocusBlur(false)" 
                                    type="textarea" 
                                    :rows="isFocus?2:1" 
                                    maxlength="140" 
                                    placeholder="写下你的评论"
                                    v-model="commentText">
                            </textarea>
                        </li>
                    </ul>
                    <div class="send" v-show="isFocus" @click="publishCommentRequest">发布</div>
                    <div v-show="!isFocus" @click="lickArticle" class="likeIcon">
                        <van-icon name="star-o" v-if="likeObj.status"/>
                        <van-icon name="star" v-else/>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import PageData from "../../api/home/tipsDetail.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            title:'健康推荐',//页面标题
            articleId:'',//文章ID
            articleTitle:'',//文章标题
            articleTime:'',//文章发布时间
            articleCon:'',//文章内容
            isShowTitle:false,//是否将评论数固定在顶部
            commentsData:{ 
                pageNo:1,
                pageSize:10,
            },
            commentsListData:{count:4},//评论列表数据
            commentList:[{editorName:"用户1",createDate:"2019-03-08",content:"这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制"},
            {editorName:"用户2",createDate:"2019-03-08",content:"这是很多高血压患者经常提起的"},
            {editorName:"用户3",createDate:"2019-03-08",content:"中药治高血压，靠不靠谱？这是"},
            {editorName:"用户4",createDate:"2019-03-08",content:"剂，但很多患者不想服用西药，认为“高血压不能吃西药，西药具有副作用、具有"}],//评论列表数据
            commentText:'', // 评论内容 
            //列表分页请求
            loading:false,
            finished:false,
            allowLoadMore:true,
            isFocus:false, // 表单是否获取焦点
            isScrollTop:true,
            isReuqest:false,
            likeObj:{ // 点赞组件数据
              status:1,
              id:'',
          },
        }
    },
    created() {
        this.singleArticleRequest()
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        singleArticleRequest(){ // 新闻详情请求
            var _this = this;
            var data = {id:this.$route.query.id}
            PageData.singleArticleRequest(data).then(function(d) {
                if (d.resultcode == '0000') {
                    _this.loading = false;
                    _this.articleTitle = d.data.array[0].advername;
                    _this.articleCon = d.data.array[0].advertext;
                    _this.articleTime = d.data.array[0].time.substr(0,10)
                } else {
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            });
        },
        //加载评论列表
        listUpload(){
            if(this.allowLoadMore) {
                this.commentsData.pageNo++;
                this.commentsRequest();
                this.allowLoadMore = false;
            }
            setTimeout(() => {
                this.allowLoadMore = true
            }, 2000);
        },
        commentsRequest(){
            var _this = this;
            var data = {id:this.$route.query.id}
            PageData.singleArticleRequest(data).then(function(d) {
                if (d.resultcode == '0000') {
                    _this.loading = false;
                    _this.tableData = d.data.array;
                } else {
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            });
        },
        commentFocusBlur(bol){ // 评论获取/失去焦点时
            this.isFocus = bol
        },
        publishCommentRequest(){ // 发布评论
           if(!this.commentText){
               this.Toast("请输入评论")
               return 
           }


           let text = this.commentText.replace(/\n/gi,"")
           let obj = {
               newsId:this.singleNewData.id,
               content:text
           }
           this.publishCommentReq(obj).then(res=>{
               this.Toast("评论成功")
               this.commentText ="";
               
               // 初始化评论列表
               this.commentListReqData.pageNo = 1;
               this.commentList = []
               this.isReuqest = false;   
               this.finished = false;
               this.commentsRequest()
               this.singleArticleRequest()
           })
        },
        //点赞或取消点赞
        lickArticle(){
            this.likeObj.status = !this.likeObj.status
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
    .van-nav-bar__title{
        color: #28b8a1;
    }
}
.main{
    .main-article{
        padding:5px 10px;
        background-color: #fff;
        .article-title{
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
        .article-time{
            text-align: right;
        }
        .article-con{
            font-size: 14px;
        }
    }
    .main-comment{
        .commentTitle{
            width:100%;
            padding:10px 10px 10px;
            position: absolute;
            z-index: 99999;
            top:45.6px;
            font-size:16px;/*px*/
            color:#343434;
            background: #f4f5f6;
            border-top:1px solid #eee;
        }
        .article-comments{
            margin-top:2px;
            // background:#fff;
            padding-bottom:45px;
            #allComment{
                background-color: #f4f5f6;
                margin-bottom:5px;
            }
            .title{
                padding:10px 10px 10px;
                font-size:16px;/*px*/
                color:#343434;
            }
            .commentList{
                min-height:150px;
                .commentItem{
                    padding:5px 10px 10px;
                    border-bottom:1px solid #eee;
                    background-color: #fff;
                    .userHeader{
                        width:100%;
                        height:32.5px;
                        margin:10px 0;
                        position: relative;
                        display: flex;
                        .portrait{
                            width:32.5px;
                            height:32.5px;
                            border-radius: 50%;
                            background:#ccc;
                            img{
                                width:100%;
                                height:100%;
                                border-radius: 50%;
                            }
                        }
                        .userMsg{
                            height:32.5px;
                            margin-left:9px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            font-size:11px;/*px*/
                            .userName{
                                color:#28b8a1;
                                margin-bottom:5px;
                            }
                            .time{
                                font-size:10px;/*px*/
                            }
                        }
                    }
                    .commentContent{
                        .mainComment{
                            font-size: 14px
                        }
                    }
                }
            }
        }
    }
}
.footer{
    width: 100%;
    min-height:43px;
    position: fixed;
    bottom:0;
    background:#fff;
    border-top:1px solid rgb(233, 233, 233);
    .btnCenter{
        min-height:43px;
        display:flex;
        align-items: center;
        .btnUl{
            width:70%;
            min-height:43px;
            display: flex;
            align-items: center;
            padding:0 5px;
            li{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size:15px;
                color:#666666;
                i{
                    vertical-align: middle;
                    color:#666666;
                }
                span{
                    margin-left:5px;
                }
            }
            .inpComment{
                width:100%;
                height:30px;
                margin:0 4% 0 2%;
                background:#f4f5f6;
                border:1px solid #ccc;
                border-radius:15px;
                textarea{
                    line-height: 20px;
                    width:80%;
                    position: relative;
                    border:none;
                    outline: none;
                    background:#f4f5f6;
                    resize: none;
                    border-radius:15px;
                    font-size:12px;/*px*/
                }
            }
            
        }
        .send{
            width:30%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .likeIcon{
            width: 28%;
            text-align: center;
            .van-icon{
                font-size: 30px
            }
        }
        
    }
    // 获取焦点时的样式
    #focusClass{
        padding:5px 0;
        .inpComment{
            width:100%;
            height:auto;
            margin:0 0 0 2%;
            border:1px solid #ccc;
            .iconfont{
                display:none;
            }
            textarea{
                width:100%;
                text-indent: 15px;
                border:none;
                outline: none;
                border-radius:15px;
            }
        }
    }
}
</style>
