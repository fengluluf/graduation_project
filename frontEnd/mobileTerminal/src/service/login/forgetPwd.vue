<template>
    <div class="forgetPwd">
        <div class="forgetPwd-header">
            <span class="iconfont icon-fanhui forgetPwd-back" @click="goBack"></span>
            重置密码
        </div>
        <div class="forgetPwd-con">
            <div class="forgetPwd-input numBox">
                <span class="iconfont icon-shouji"></span>
                <input type="number" placeholder="请输入手机号" class="input-txt" v-model="phoneNum">
            </div>
            
            <div class="forgetPwd-input pwdBox">
                <span class="iconfont icon-suo"></span>
                <input :type="isShowPWD?'text':'password'" placeholder="请输入密码" class="input-txt" v-model="password">
                <span :class="['iconfont',isShowPWD?'icon-yanjing':'icon-yanjing1']" @click="switchAttr" id="eye"></span>
            </div>
            <div class="forgetPwd-input verBox">
                <span class="iconfont icon-yanzheng"></span>
                <input type="text" placeholder="请输入验证码" class="input-txt" maxlength="6" v-model="verification">
                <button :class="['getVer',sendVer?'btnColor':'']" @click="getVer" :disabled="sendVer">{{getVerText}}</button>
            </div>
        </div>
        <div class="forgetPwd-btn">
            <button>重置密码</button>
        </div>
    </div>
</template>
<script>
import pageData from "../../api/login/forgetPwd.js"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'

export default {
    data() {
        return {
            phoneNum: '',
            password: '',
            verification:'',
            errorMsg:'',
            isShowPWD:false,//是否显示密码
            countdown:60,
            getVerText:'获取验证码',
            sendVer:false,
        }
    },
    created() {
        
    },
    methods: {
        //返回登录页
        goBack(){
            this.$router.back();
        },
        //密码是否可见
        switchAttr(){
            this.isShowPWD = !this.isShowPWD
        },
        //设置定时器
        setSendTime() {
            if (this.countdown == 0) {
                this.sendVer = false;
                this.getVerText="获取验证码";
                this.countdown = 60;
                return;
            } else {
                this.sendVer = true;
                this.getVerText="重新获取(" + this.countdown + "s)";
                this.countdown--;
            }
            var _this = this;
            setTimeout(function () {
                _this.setSendTime()
            }, 1000)
        },
        //获取验证码
        getVer(){
            var _this = this;
            var data={
                phoneNum: this.phoneNum,
                password: this.password
            }
            if(this.phoneNum && base.checkPhone(this.phoneNum)){
                pageData.getVer(data).then(function (d) {
                    if(d.resultCode == 200) {
                        _this.setSendTime()
                    }
                })           
            }else{
                this.errorMsg = '请正确的手机号';
                this.$dialog.alert({
                    message: this.errorMsg
                });
                return false;
            }
        }
    }
}
</script>
<style scoped lang="less">
.forgetPwd{
    background-color: #ffffff;
    height: 100%;
    .forgetPwd-header{
        font-weight: bold;        
        color:#343434;
        font-size:18px;
        text-align: center;
        height: 64px;
        line-height: 80px;
        position: relative;
        border-bottom:1px solid #ebebeb;
        .forgetPwd-back{
            position: absolute;
            left:12px;
        }
    }
    .forgetPwd-con{
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
        width:calc(100% - 48px);
        .forgetPwd-input{
            height:55px;
            line-height:50px;
            border-bottom: 1px solid #ebebeb;
            position: relative;
            .iconfont{
                color: #b6b6b6;
                font-size:18px;
                margin-left: 2px;
                margin-right:5px;
            }
            .input-txt{
                border:none;
            }
            .input-txt::-webkit-input-placeholder{
                color: #b6b6b6;
                font-size: 16px;
            }
            .input-txt:focus {
                outline:none
            }
        }
        .verBox .getVer{
            background: transparent;
            position: absolute;
            right: 5px;
            height:28px;
            line-height: 28px;
            border-radius: 3.5px;
            border: 1px solid #28b8a1;
            color: #28b8a1;
            display: inline;
            text-align: center;
            margin-top:17px;
        }
        .verBox .btnColor{
            color: #fff;
            background:#c9c9c9;
            border:none;
        }
        .pwdBox #eye{
            position: absolute;
            right: 5px;
        }
    }
    .forgetPwd-btn{
        width:300px;
        margin:40px auto;
        button{
            text-align: center;
            background-color: #28b8a1;
            background-size:300px 40px;
            border:none;
            border-radius: 25px;
            width:300px;
            height:40px;
            color:#fff;
            font-size: 18px;
        }
    }
}
</style>
