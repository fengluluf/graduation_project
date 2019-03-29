<template>
    <div class="modifyPwd">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="修改密码" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                 <div class="list">
                <div class="listItem">
                    <span class="itemTitle">原始密码</span>
                    <span class="itemCon">
                        <input type="password" placeholder="请输入旧密码" v-model="oldPwd" />
                    </span>
                </div>
                <div class="listItem">
                    <span class="itemTitle">新密码</span>
                    <span class="itemCon">
                        <input type="password" placeholder="请输入新密码" v-model="newPwdOnce" />
                    </span>
                </div>
                <div class="listItemLast">
                    <span class="itemTitle">确认密码</span>
                    <span class="itemCon">
                        <input type="password" placeholder="再次输入新密码" v-model="newPwdSec" />
                    </span>
                </div>
            </div>
            <div class="button">
                <van-button type="primary" @click="confirm">确认修改</van-button>
            </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/personal/personal.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components: {Layout},
    data() {
        return {
            title:"修改密码",
            oldPwd:'',
            newPwdOnce:'',
            newPwdSec:''
        }
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        //校验是否为空
        checkOldPwd(){
            if(this.oldPwd === '') {
                MessageBox.alert("请输入旧密码");
                return false;
            }else{
                return true;
            }
        },
        checknewOnce(){
            if(this.newPwdOnce === '') {
                MessageBox.alert("请输入新密码");
                return false;
            }else{
                return true;
            }
        },
        checknewSec(){
            if(this.newPwdSec === '') {
                MessageBox.alert("请再次输入密码");
                return false;
            }else{
                return true;
            }
        },
        //修改密码
        confirm(){
            var _this = this;
            var data = {
                userId:localStorage.getItem("userIdPMD"),
                oldPassword:this.oldPwd,
                newPassword:this.newPwdOnce
            }
            if(this.checkOldPwd()&&this.checknewOnce()&&this.checknewSec()){
                if(this.newPwdOnce==this.newPwdSec){
                    pageData.modifyPwd(data).then(function (d) {
                        if(d.resultCode == 200) {
                            Toast("修改成功");
                        }else{
                            Toast(d.resultMessage);
                        }
                    })
                }else{
                    MessageBox.alert("两次输入的密码不一致");
                }  
            }
        },
    },
    
}
</script>
<style scoped lang="less">
.van-icon{
    color: #28b8a1
}
.modifyPwd{
    height:100%;
    background-color:#f3f3f3;
}
.modifyPwd .header{
    background-color: #fff;
    z-index:999;
    width:100%;
    height:45px;
    line-height:45px;
    position: fixed;
    top:0
}
.modifyPwd .main{
    padding-top:45px;
    .list{
        background-color: #fff;
        padding:0 10px;
        margin-bottom:10px;
        .listItem{
            border-bottom: 1px solid #ececec;/*no*/
            padding:0 5px;
            height:45px;
            line-height:45px;
            display: flex;
        }
        .itemTitle{
            flex: 1;
        }
        .itemCon{
            flex: 3;
        }
        input{
            border:none;
            height:35px;
            line-height: 35px;
            width:100%;
        }
        .listItemLast{
            padding:0 5px;
            height:45px;
            line-height:45px;
            display: flex;
        }
    }
    .button{
        margin-top:50px;
        text-align: center;
        width: 100%;
        .van-button{
            height:35px;
            width:150px;
            font-size:14px;/*px*/
            background-color:#28b8a1;
            border:none
        }
    }
}
</style>
