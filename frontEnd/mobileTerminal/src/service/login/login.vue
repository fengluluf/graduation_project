<template>
    <div class="login">
        <div class="login-header">登录</div>
        <div class="login-con">
            <div class="login-input">
                <span class="iconfont icon-wode"></span>
                <input type="number" placeholder="请输入手机号" class="input-txt" v-model="userNumber">
            </div>
            <div class="login-input">
                <span class="iconfont icon-suo"></span>
                <input :type="isShowPWD?'text':'password'" placeholder="请输入密码" class="input-txt" v-model="password">
                <span :class="['iconfont',isShowPWD?'icon-yanjing':'icon-yanjing1']" @click="switchAttr"></span>
            </div>
            <div class="login-forget">
                <span class="goForPwd" @click="goForPwd">忘记密码?</span>
            </div>
            <div class="login-btns">
                <button class="btn loginBtn" @click="login">登录</button>
                <button class="btn registerBtn" @click="goRegister">注册</button>
            </div>
        </div>
    </div>
</template>
<script>
import pageData from "../../api/login/login"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'

export default {
    data() {
        return {
            userNumber: '',
            password: '',
            errorMsg:'',
            isShowPWD:false,//是否显示密码
        }
    },
    created() {
        
    },
    methods: {
        //密码是否可见
        switchAttr(){
            this.isShowPWD = !this.isShowPWD
        },
        //跳转到重置密码页面
        goForPwd(){
            this.$router.push('/forgetPwd');
        },
        //跳转到注册页面
        goRegister(){
            this.$router.push('/register');
        },
        //校验手机号
        checkName(){
            if(this.userNumber === '') {
                this.errorMsg = '请输入手机号';
                this.$dialog.alert({
                    message: this.errorMsg
                });
                return false;
            }else if(!base.checkPhone(this.userNumber)){
                this.errorMsg = '请输入正确格式的手机号';
                this.$dialog.alert({
                    message: this.errorMsg
                });
                return false;
            }else{
                return true;
            }
        },
        //校验密码
        checkPwd(){
            if(this.password === '') {
                this.errorMsg = '请输入密码';
                this.$dialog.alert({
                    message: this.errorMsg
                });
                return false;
            }else{
                return true;
            }
        },
        //登录
        login(){
            var _this = this;
            var data = {
                userNumber: this.userNumber,
                password: this.password
            }
            if(this.checkName() && this.checkPwd()){
                pageData.login(data).then(function (d) {
                    if(d.data.result == "00") {
                        _this.$router.push('/home');
                        sessionStorage.setItem("userId",d.data.userInfo.userId)
                        console.log(sessionStorage.getItem("userId"))
                    }else{
                        _this.$dialog.alert({
                            message: d.data.text
                        });
                    }
                })
            }
            
        },
    },
    components: {
    }
}
</script>
<style scoped lang="less">
.login{
    height:100%;
    background: url(../../assets/images/login-bg.png) no-repeat top center;
    background-size: cover;
    overflow: scroll;
    box-sizing: border-box;
    .login-header{
        color:#fff;
        font-size:18px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        position: relative;
        overflow: hidden;
    }
}
.iconfont{
    font-size:18px;
}
.login-con{
    background-repeat: no-repeat;
    width:calc(100% - 50px);
    height:400px;
    padding-top:30px;
    color:#fff;
    margin:80px auto;
    background:rgba(255, 255, 255, 0.3);
    border-radius: 10px;
}
.login-con .login-input{
    border-bottom: 1px solid #fff;
    width:calc(100% - 60px);
    margin-left:30px;
    height:60px;
    line-height:60px;
}
.login-con .login-input .input-txt{
    background-color: transparent;
    border:none;
    font-size: 16px;
    color:#fff;
    width:calc(100% - 80px);
}
.login-con .login-input .input-txt::-webkit-input-placeholder{
    color: #fff;
    font-size: 16px;
}
.login-con .login-input .input-txt:focus {
    outline:none
}
.login-con .login-forget{
    border-bottom:1px solid #fff;
    float: right;
    margin-top:10px;
    margin-right: 27px;
    font-size:16px;
}
.login-btns {
    margin-top:60px;
    text-align: center;
}
.login-btns .btn{
    width:calc(100% - 48px);
    height:40px;
    border-radius: 20px;
    font-size:18px;
}
.login-btns .btn:focus {
    outline:none
}
.login-btns .loginBtn{
    background-color: #fff;
    border:1px solid #fff;
    color:#28b8a1
}
.login-btns .registerBtn{
    background-color: transparent;
    border:1px solid #fff;
    color:#fff;
    margin-top:1.1rem;
}
</style>
