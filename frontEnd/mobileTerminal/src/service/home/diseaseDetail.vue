<template>
    <div class="share">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar :title="diseaseDetail.diseaseName"  @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <!-- <div class="disease-title">{{diseaseDetail.title}}</div> -->
                <div class="disease-summary">
                    <div class="summary-title">简介</div>
                    <div class="summary-con" v-html="diseaseDetail.pathology"></div>
                </div>
                <div>
                    <van-collapse v-model="activeNames">
                        <van-collapse-item title="病因和发病机制" name="1">{{diseaseDetail.pathology}}</van-collapse-item>
                        <van-collapse-item title="病理" name="2"></van-collapse-item>
                        <van-collapse-item title="临床表现" name="3">{{diseaseDetail.symptom}}</van-collapse-item>
                        <van-collapse-item title="实验室和辅助检查" name="3"></van-collapse-item>
                        <van-collapse-item title="诊断和鉴别诊断" name="4"></van-collapse-item>
                        <van-collapse-item title="治疗" name="5">{{diseaseDetail.treatment}}</van-collapse-item>
                        <van-collapse-item title="预后和预防" name="6">{{diseaseDetail.attention}}</van-collapse-item>
                    </van-collapse>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/diseaseDetail.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            activeNames:['3','5','6'],//控制展开的面板列表
            diseaseDetail:{}
        }
    },
    created() {
        this.getDiseaseDetail()
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        getDiseaseDetail(){
            var _this = this;
            var data = {id:this.$route.query.id}
            pageData.getDiseaseDetail(data).then(function(res){
                if(res.result == "0000"){
                    if(res.data.result == "00"){
                        _this.diseaseDetail = res.data.array
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
    .disease-title{
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        height:30px;
        line-height: 30px;
    }
    .disease-summary{
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
