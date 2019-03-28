<template>
  <div class="header">
    <div class="header-logo">
        <!-- <img src="../../assets/images/loginLogo.jpg"> -->
    </div>
    <div class="header-msg">
        <span>欢迎&emsp;{{userName}}</span>
        <el-button type="primary" size="mini" plain @click="signOut" class="logout">注销</el-button>
    </div>
  </div>
</template>

<script>
import pageData from "../../api/login/login.js"
export default {
  name: 'Header',
  props:{
        userName:{
            type: String,
            default: ''
        },
    },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    methods:{
        signOut(){
             var _this = this;
            var data = "userId=" + sessionStorage.getItem("userId");
            pageData.signOut(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.$router.push('/')
                    sessionStorage.clear();
                }
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    width: 100%;
    font-size: 12px;
}
.header .header-logo{
    display: inline-block;
    line-height: 60px;
    height:60px;
}
.header .header-logo img{
    width: 120px;
    height:40px;
    vertical-align: middle;
}
.header .header-msg{
    float: right;
}
.header .logout:hover {
    background: rgba(236,245,255,.8);
    color: #409EFF;
    border-color: #b3d8ff;
}
</style>
