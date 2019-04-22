<template>
  <div class="login">
    <div class="container">
        <div class="login-wel">
            <span>健康助手后台管理系统</span>
        </div>
        <div class="login-input">
            <div class="inputBox">
                <span class="title">用户名</span>
                <el-input v-model="userName" placeholder="请输入用户名" class="in" size="mini"></el-input>
            </div>
            <div class="inputBox">
                <span class="title">密码</span>
                <el-input v-model="password" placeholder="请输入密码" class="in" size="mini" type="password"></el-input>
            </div>
            <div class="button">
                <el-button type="info" plain size="small" @click="login">登录</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import pageData from "../../api/login/login.js"

export default {
    name: 'login',
    data () {
        return {
            userName:"",
            password:"",
        }
    },
    methods:{
        //校验用户名
        checkName(){
            if(this.userName === '') {
                this.errorMsg = '请输入用户名';
                this.$message({
                    message: this.errorMsg,
                    type: 'warning'
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
                this.$message({
                    message: this.errorMsg,
                    type: 'warning'
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
                userName: this.userName,
                password: this.password
            }
            // if(this.checkName() && this.checkPwd()){
                pageData.login(data).then(function (d) {
                    if(d.resultCode == 200) {
                        _this.$router.push('/home');
                        sessionStorage.setItem("userId", d.resultJson.id);
                        sessionStorage.setItem("userName", d.resultJson.userName);
                    }else{
                        _this.$message({
                            type: "warning",
                            message: d.resultMessage
                        });
                    }
                })
            // }
        },
    }
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    background: url(../../assets/images/login_bg.jpg) no-repeat center center;
    background-size: 100% 100%; 
}
.login .container{
    position: absolute;
    margin:auto;
    top:0;
    bottom:0;
    left:0;
    right:0;
    height:200px;
    width:350px;
    border:1px solid #999;
    border-radius: 10px;
    /* background-color:#fff; */
    background:rgba(255, 255, 255, 0.3);
    color:#fff;
}
.login .login-logo{
    height:95px;
    padding:0 10px;
}
.login .login-logo img{
    height:95px;
    width: 100%;
}
.login .login-wel{
    text-align: center;
    margin:10px auto;
}
.login .login-input{
    padding:20px 20px;
}
.login .inputBox{
    display:flex;
    height:40px;
    line-height: 40px;
}
.login .title{
    flex: 1;
}
.login .in{
    flex:3;
}
.login .button{
    margin-top:20px;
    text-align: center;
}
.login .el-button--info.is-plain{
    color:#000;
    width: 80px;
}
</style>
