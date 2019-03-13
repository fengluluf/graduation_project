<template>
    <div class="share">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar :title="diseaseDetail.title"  @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <!-- <div class="disease-title">{{diseaseDetail.title}}</div> -->
                <div class="disease-summary">
                    <div class="summary-title">简介</div>
                    <div class="summary-con" v-html="diseaseDetail.summary"></div>
                </div>
                <div>
                    <van-collapse v-model="activeNames">
                        <van-collapse-item title="病因和发病机制" name="1">
                            1．感染可以是病毒和细菌直接感染所致，也可由上呼吸道感染的病毒(如腺病毒、流感病毒、呼吸道合胞病毒和副流感病毒等)或细菌(如流感嗜血杆菌、肺炎球菌、链球菌、葡萄球菌等)蔓延引起。近年来因支原体和衣原体引起的急性气管-支气管炎也趋多见。 
                            本病多数发生于受凉、淋雨、过度疲劳等诱因导致机体气管-支气管防御功能受损时，往往在病毒感染的基础上继发细菌感染。 <br/>
                            2．物理、化学刺激冷空气、粉尘、刺激性气体或烟雾(如二氧化硫、二氧化氮、氨气、氯气、臭氧等)的吸入均可引起气管-支气管粘膜的急性炎症。  <br/>
                            3．过敏反应多种变应原均可引起气管和支气管的过敏反应，常见者包括花粉、有机粉尘、真菌孢子等的吸入，钩虫、蛔虫的幼虫在肺内移行，以及细菌蛋白质引起机体的过敏等。
                        </van-collapse-item>
                        <van-collapse-item title="病理" name="2">
                            气管、支气管粘膜充血、水肿，有淋巴细胞和中性粒细胞浸润；纤毛细胞损伤、脱落；粘液腺体增生、肥大，分泌物增加。合并细菌感染时，分泌物呈粘液脓性。炎症消退后，气道粘膜的结构和功能可恢复正常。
                        </van-collapse-item>
                        <van-collapse-item title="临床表现" name="3">
                            1．症状起病较急。常先有上呼吸道感染症状，继之出现干咳或伴少量粘痰，痰量逐渐增多、咳嗽症状加剧，偶可痰中带血。如果伴有支气管痉挛，可出现程度不一的胸闷、气急。 
                            全身症状一般较轻，可有低～中等度发热，多在3～5天后降至正常。咳嗽和咳痰可延续2～3周才消失。 <br/>
                            2．体征体检时两肺呼吸音粗糙，可闻及散在干、湿性啰音，啰音部位常常不固定，咳嗽后可减少或消失。 
                        </van-collapse-item>
                        <van-collapse-item title="实验室和辅助检查" name="3">
                            1．外周血象多数病例的白细胞计数和分类无明显改变，细菌感染严重时白细胞总数和中性粒细胞可增多。  <br/>
                            2．痰液检查痰液涂片和培养可发现致病菌。  <br/>
                            3．胸部X线多数表现为肺纹理增粗，少数病例无异常表现。 
                        </van-collapse-item>
                        <van-collapse-item title="诊断和鉴别诊断" name="4">
                            (一)诊断  <br/>
                            根据上述病史、咳嗽和咳痰等临床症状，两肺闻及散在干、湿性啰音，结合外周血象和胸部X线检查结果，可对本病作出临床诊断。痰液涂片和培养等检查有助于病因诊断。 <br/> 
                            (二)鉴别诊断  <br/>
                            需与本病相鉴别的疾病包括：  <br/>
                            1．流行性感冒常有流行病史；起病急骤，全身中毒症状重，可出现高热、全身肌肉酸痛、头痛、乏力等症状，但呼吸道症状较轻；根据病毒分离和血清学检查结果可确定诊断。 <br/> 
                            2．急性上呼吸道感染鼻咽部症状明显；一般无显著的咳嗽、咳痰；肺部无异常体征；胸部X线正常。  <br/>
                            3．其他疾病支气管肺炎、肺结核、支气管哮喘(咳嗽变异性哮喘)、肺脓肿、麻疹、百日咳等多种疾病均可能出现类似急性气管-支气管炎的临床症状，应根据这些疾病的临床特点逐一加以鉴别。  <br/>
                        </van-collapse-item>
                        <van-collapse-item title="治疗" name="5">
                            (一)一般治疗  <br/>
                            适当休息、注意保温、多饮水，避免吸入粉尘和刺激性气体。  <br/>
                            (二)对症治疗  <br/>
                            1．镇咳可酌情应用氢溴酸右美沙芬、喷托维林或苯丙哌林等镇咳剂。但对于有痰的病人不宜给予可待因等强力镇咳药，以免影响痰液排出。兼顾镇咳与祛痰的复方斜剂如复方甘草合剂等在临床应用较为广泛。  <br/>
                            2．祛痰除了复方氯化铵、溴己新、N-乙酰-L-半胱氨酸(NAC)和鲜竹沥等常用祛痰药外，近年来，溴己新的衍生物盐酸氨溴索(ambroxol)和从桃金娘科植物中提取的强力稀化粘素也已在临床广泛应用。  <br/>
                            3．解痉和抗过敏对于因过敏反应引起支气管痉挛的病人，可给予解痉平喘和抗过敏药物，如氨茶碱、β2受体激动剂(如沙丁胺醇等)和马来酸氯苯那敏等。  <br/>
                            (三)抗菌药物治疗  <br/>
                            应及时应用抗菌药物控制气管-支气管内的炎症。一般首先选用青霉素类、大环内酯类(红霉素、罗红霉素、阿奇霉素等)、氟喹诺酮类(环丙沙星、左氧氟沙星等)，必要时可应用第一代或第二代头孢菌素等。以口服为主，必要时可静脉滴注。 
                        </van-collapse-item>
                        <van-collapse-item title="预后和预防" name="6">
                            1．预后多数患者的预后良好，但少数患者可以并发肺炎或发展为慢性支气管炎。  <br/>
2．预防防止上呼吸道感染，防止空气污染，避免受凉，避免劳累，避免吸入环境中的变应原，可预防本病的发生；参加适当的体育锻炼，增强体质，提高呼吸道的抵抗力，也可减少本病的发生。
                        </van-collapse-item>
                    </van-collapse>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
// import pageData from "../../api/home/diseaseDetail.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            activeNames:['1','2','3'],//控制展开的面板列表
            diseaseDetail:{title:'急性气管-支气管炎',summary:'急性气管-支气管炎(acutebroncho-bronchitis)是由感染、物理、化学刺激或变应原引起的气管-支气管粘膜的急性炎症。临床主要症状为咳嗽和咳痰。常见于寒冷季节或气温突然变冷时。部分病例由上呼吸道感染迁延而来。'}
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
