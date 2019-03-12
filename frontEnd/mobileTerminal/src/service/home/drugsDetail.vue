<template>
    <div class="drugsDetail">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar :title="drugsDetail.title"  @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <!-- <div class="drugs-title">{{drugsDetail.title}}</div> -->
                <div class="drugs-summary">
                    <div class="summary-title">简介</div>
                    <div class="summary-con" v-html="drugsDetail.summary"></div>
                </div>
                <div>
                    <van-collapse v-model="activeNames">
                        <van-collapse-item title="适应症" name="1">
                            疏风散寒，解表清热。用于风寒感冒引起头痛发热、咳嗽咽干、全身酸重、鼻流清涕
                        </van-collapse-item>
                        <van-collapse-item title="用量用法" name="2">
                            口服：开水冲服，每次12g，每日2～3次。
                        </van-collapse-item>
                        <van-collapse-item title="注意事项" name="3">
                            （1）素有高血压、心脏病、肝病、糖尿病、肾病等严重慢性病者，孕妇或正在接受其他治疗的患者均应在医师指导下服用。<br/>
                            （2）应严格按照用法用量服用，婴幼儿、年老体虚患者应在医师指导下服用。<br/>
                            （3）服用三天后，症状无缓解，发热、咳嗽加重，并出现其他严重症状时，应停药，并去医院就诊。<br/>
                            （4）该药应放置于儿童不能触及处。<br/>
                            （5）过敏体质者慎用。<br/>
                            （6）不适用于风热感冒。不宜在服药期间同时服用滋补性中成药。<br/>
                            （7）在服用本品期间应多饮开水、避风寒和忌食生冷油腻。<br/>
                        </van-collapse-item>
                    </van-collapse>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
// import pageData from "../../api/home/drugsDetail.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            activeNames:['1','2','3'],//控制展开的面板列表
            drugsDetail:{title:'感冒清热冲剂',summary:'感冒清热冲剂是治疗风寒感冒的常用药物，是由中药荆芥穗、桔梗、柴胡、苦杏仁等药物共同配伍加工提炼而成的中成药，方剂中的荆芥是治疗感冒的良药，具有散风、解表、透疹等多种功能。'},
            
        }
    },
    created() {
        
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
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
