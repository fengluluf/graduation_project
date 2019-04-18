<template>
    <div class="findDrugs">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="找药品" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="list">
                    <div class="listItem" v-for="(item,key) in drugsSort" :key="key" @click="goDrugsSort(item)">
                        <van-row>
                            <van-col span="21">
                                <div class="listCon">{{item.drugname}}</div>
                            </van-col>
                            <van-col span="3">
                                <span class="goDetail"><van-icon name="arrow" /></span>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/findDrugs"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/drugsDetail"){
                vm.$children[0].$refs.main.scrollTop = vm.listscrollTops;
            }else{
                vm.listscrollTops=0;
            }
        });
    }, 
    data() {
        return {
            listscrollTops:0,//滚动的高度
            drugsSort:[],
            // drugsSort:[{id:1,name:"抗感染类药物"},{id:2,name:"心血管系统药物"},{id:3,name:"消化系统用药"},
            // {id:4,name:"呼吸系统药物"},{id:5,name:"神经系统用药"},{id:6,name:"治疗精神障碍药物"},{id:7,name:"镇痛、解热、抗炎、抗痛风药"},
            // {id:8,name:"抗变态反应药"},{id:9,name:"泌尿系统药物"},{id:10,name:"血液和造血系统药"},{id:11,name:"激素类及影响内分泌药物"},
            // {id:12,name:"抗肿瘤药"},{id:13,name:"维生素、矿物质、复方氨基酸制剂及其他营养药"},{id:14,name:"调节水、电解质和酸碱平衡用药"},
            // {id:15,name:"麻醉药及辅助麻醉药"},
            // {id:16,name:"诊断用药"},{id:17,name:"解毒药"},{id:18,name:"生物制药"},{id:19,name:"妇产科"},
            // {id:20,name:"口腔科"},{id:21,name:"眼科"},{id:22,name:"耳鼻咽喉科"},{id:23,name:"皮肤科"}]
        }
    },
    created() {
        this.getdrugsSort();
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        //获取药品一级分类
        getdrugsSort(){
            var _this = this;
            pageData.drugsRes().then(function (d) {
                if(d.resultcode == "0000") {
                    _this.drugsSort = d.data.array;
                }else{
                    _this.$dialog.alert({
                        message: d.data.text
                    });
                }
            })
        },
        //进入药品详情页
        goDrugsSort(item){
            this.$router.push({path:'/findDrugsSec',query:{id:item.id,name:item.drugname}});
            this.listscrollTops = this.$children[0].$refs.main.scrollTop;
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
.list{
    background-color: #fff;
    padding:0 10px;
    margin-bottom:10px;
    .listItem{
        font-size: 16px;
        border-bottom: 1px solid #ececec;/*no*/
        line-height:40px;
        position: relative;
        display: inline;
        .van-row{
            border-bottom: 1px solid #ececec;
        }
    }
    .listItemLast{
        height:45px;
        line-height:45px;
    }
    .goDetail{
        float: right;
    }
}
</style>
