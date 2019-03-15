<template>
    <div class="home">
        <div class="title">
            <p>{{msg}}</p>
        </div>
        <div class="con">
            <div class="con-img">
                <img :src="userMsg.headImg" v-if="userMsg.headImg"> 
                <img src="../../assets/images/+.png" v-else>
            </div>
            <div class="con-msg">
                <p>{{userMsg.userName}}&emsp;&emsp;管理员</p>
                <p>{{nowTime}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import pageData from "../../api/home/home.js"
import {formatDate} from '../../util/base'

export default {
  name: 'home',
  data () {
    return {
        msg:"欢迎登录健康助手后台管理系统",
        nowTime: '',
        userMsg:{userName:'userName'},
    }
  },
  created(){
      this.getUserMsg();
  },
    methods:{
        //获取用户信息
        getUserMsg(){
            this.nowTime = formatDate(new Date());
            var _this = this;
            var data = 'userId='+sessionStorage.getItem('userId');
            pageData.getUserMsg(data).then(function (d) {
                if(d.resultCode == 200) {
                    // _this.userMsg = d.resultJson;
                }else{
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            })
        },
    }
}
</script>

<style scoped>
.home{
    padding:10px;
}
.home .con{
    padding:20px 40px;
    vertical-align: middle;
}
.home .con-img{
    display: inline-block;
}
.home .con-img img{
    height:50px;
    width:50px;
    border-radius: 25px
}
.home .con-msg{
    display: inline-block;
    margin-left:20px;
    
}
.home .con-msg p{
    height:25px;
    line-height: 25px;
}
</style>
