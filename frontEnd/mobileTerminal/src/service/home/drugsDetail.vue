<template>
    <div class="drugsDetail">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar :title="drugsDetail.drugName"  @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <!-- <div class="drugs-title">{{drugsDetail.title}}</div> -->
                <div class="drugs-summary">
                    <div class="summary-title">简介</div>
                    <div class="summary-con" v-html="drugsDetail.drugTxt"></div>
                </div>
                <div>
                    <van-collapse v-model="activeNames">
                        <van-collapse-item title="适应症" name="1">
                            {{drugsDetail.drugAtten}}
                        </van-collapse-item>
                        <van-collapse-item title="用量用法" name="2">
                            {{drugsDetail.drugUsage}}
                        </van-collapse-item>
                        <van-collapse-item title="注意事项" name="3">
                            {{drugsDetail.drugSymptom}}
                        </van-collapse-item>
                    </van-collapse>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/drugsDetail.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            activeNames:['1','2','3'],//控制展开的面板列表
            drugsDetail:{},
            
        }
    },
    created() {
        this.getDrugDetail();
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        getDrugDetail(){
            var _this = this;
            var data = {id:this.$route.query.id}
            pageData.getDrugDetail(data).then(function(res){
                if(res.resultcode == "0000"){
                    if(res.data.result == "00"){
                        _this.drugsDetail = res.data.array
                    }else{
                        _this.$toast(res.data.text);
                    }
                }else{
                    _this.$toast(res.data.text);
                }
            })
        }
    },
}
</script>
<style scoped lang="less">
.header{
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
}
.van-icon{
    color:#28b8a1
}
.main{
    .drugs-title{
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        height:30px;
        line-height: 30px;
    }
    .drugs-summary{
        background-color: #fff;
        .summary-title{
            padding-left:5px;
            height:30px;
            line-height: 30px;
            border-bottom: 1px solid #f5f7f8;
            font-size: 16px;
        }
        .summary-con{
            padding:5px 10px;
            color: #7d7e80;
        }
    }
}
</style>
