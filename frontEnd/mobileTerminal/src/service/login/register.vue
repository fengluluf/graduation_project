<template>
    <div class="register">
        <div class="register-header">
            <span class="iconfont icon-fanhui register-back" @click="goBack"></span>
            注册
        </div>
        <div class="register-con">
            <div class="register-input numBox">
                <span class="iconfont icon-shouji"></span>
                <input type="number" placeholder="请输入手机号" class="input-txt" v-model="phoneNum" @blur="checkNum">
            </div>
            
            <div class="register-input pwdBox">
                <span class="iconfont icon-suo"></span>
                <input :type="isShowPWD?'text':'password'" placeholder="密码长度应为6-12位" class="input-txt" v-model="password">
                <span :class="['iconfont',isShowPWD?'icon-yanjing':'icon-yanjing1']" @click="switchAttr" id="eye"></span>
            </div>
            <div class="register-input verBox">
                <span class="iconfont icon-yanzheng"></span>
                <input type="text" placeholder="请输入验证码" class="input-txt" maxlength="6" v-model="verification">
                <button :class="['getVer',sendVer?'btnColor':'']" @click="getVer" :disabled="sendVer">{{getVerText}}</button>
            </div>
        </div>
        <div class="register-btn">
            <button @click="register">注册</button>
        </div>
    </div>
</template>
<script>
import pageData from "../../api/login/register.js"
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
        //失去焦点时验证手机号
        checkNum(){
            if(!base.checkPhone(this.phoneNum)){
                this.errorMsg = '请正确的手机号';
                this.$dialog.alert({
                    message: this.errorMsg
                });
                return false;
            }else{
                return true;
            }
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
                userNumber: this.phoneNum,
            }
            if(!base.checkPhone(this.phoneNum)){
                this.errorMsg = '请正确的手机号';
                this.$dialog.alert({
                    message: this.errorMsg
                });
                return false;
            }else{
                pageData.getVer(data).then(function (d) {
                    if(d.data.result == "00") {
                        _this.setSendTime()
                    }else{
                        _this.$dialog.alert({
                            message: d.data.text
                        });
                    }
                })
            }
        },
        //点击注册
        register(){
            var _this = this;
            var data = {
                userNumber:this.phoneNum,
                password:this.password,
                sendNumber:this.verification
            }
            if(12<this.password.length||this.password.length<6){
                this.$dialog.alert({
                    message:"密码长度应为6-12位"
                })
                return false;
            }else{
                pageData.register(data).then(function(d){
                    if(d.resultcode == "0000"){
                        _this.$dialog.alert({
                            message: d.data.text
                        });
                    }
                })
            }
        },
    }
}
</script>
<style scoped lang="less">
.register{
    background-color: #ffffff;
    height: 100%;
    .register-header{
        font-weight: bold;        
        color:#343434;
        font-size:18px;
        text-align: center;
        height: 64px;
        line-height: 80px;
        position: relative;
        border-bottom:1px solid #ebebeb;
        .register-back{
            position: absolute;
            left:12px;
        }
    }
    .register-con{
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
        width:calc(100% - 48px);
        .register-input{
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
    .register-btn{
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
