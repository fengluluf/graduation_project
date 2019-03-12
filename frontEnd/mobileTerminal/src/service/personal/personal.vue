<template>
    <div class="personal">
        <Layout :active="active">
            <div slot="header" class="header">
                <van-nav-bar title="我的" :right-text="rightText" @click-right="onClickRight"></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="list">
                    <div class="imgItem">
                        <span class="listCon">头像</span>
                        <!-- <img :src="userMsg.headImg" class="img" id="imagebg" @click="chooseImg">  -->
                        <img src="../../assets/images/head/-.png" class="img" id="imagebg" @click="chooseImg">
                    </div>
                    <div class="listItem">
                        <span class="listCon">用户名</span>
                        <span class="goDetail">
                            <input type="text" class='userName' v-model="userMsg.userName">
                        </span>
                    </div>
                    <div class="listItemLast">
                        <span class="listCon">手机号</span>
                        <span class="goDetail">
                            <input type="text" class='userName' v-model="userMsg.phoneNum">
                        </span>
                    </div>
                </div>
                <div class="list">
                    <div class="listItem" @click="goMycollect">
                        <span class="listCon">我的收藏</span>
                        <span class="goDetail"><van-icon name="arrow" /></span>
                    </div>
                    <div class="listItemLast" @click="goMyarticle">
                        <span class="listCon">我的文章</span>
                        <span class="goDetail"><van-icon name="arrow" /></span>
                    </div>
                </div>
                <div class="main-btn"><van-button type="danger">退出登录</van-button></div>
            </div>
            <div slot="footer"></div>
        </Layout>
    </div>
</template>
<script>
// import pageData from "../../api/personal/personal.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            active:2,//选中的底部导航
            userMsg:{
                phoneNum:'13368982222',
                headImg:'',
                userName:'1111',
            },
            rightText:'保存'
        }
    },
    created() {
        
    },
    methods: {
        //选择图片
        chooseImg(){
            var _this = this;
            
        },
        //修改个人信息进行保存
        onClickRight(){

        },
        goMycollect(){
            this.$router.push("/myCollect")
        },
        goMyarticle(){
            this.$router.push("/myArticle")
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
    background-color:#f3f3f3;
    .list{
        background-color: #fff;
        padding:0 10px;
        margin-bottom:10px;
        .imgItem{
            border-bottom: 1px solid #ececec;/*no*/
            padding:5px 0;
            height:80px;
            line-height:80px;
        }
        .listItem{
            border-bottom: 1px solid #ececec;/*no*/
            height:45px;
            line-height:45px;
            position: relative;
        }
        .listItemLast{
            height:45px;
            line-height:45px;
        }
        .goDetail{
            float: right;
        }
        .icon-jinru{
            color: #999;
            font-size:18px;
        }
        .img{
            height:70px;
            width:70px;
            border-radius: 40px;
            float: right;
        }
        .chooseImg{
            height: 70px;
            width: 70px;
            position: absolute;
            right: 10px;
            opacity: 0;
        }
        .userName{
            border: none;
            height: 35px;
            width:100px;
            text-align: right;
        }
    }
    .main-btn{
        text-align: center;
        margin-top:50px;
    }
}
</style>
