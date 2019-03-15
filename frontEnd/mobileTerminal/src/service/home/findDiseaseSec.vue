<template>
    <div class="share">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="查疾病" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="mian-sort">
                    <van-tabs color="#28b8a1" ellipsis animated @click="onClick" sticky scroll="{scrollTop:146px,isFixed:true}">
                        <van-tab v-for="(item,key) in sortList" :title="item.name" :key="key">
                            <!-- <van-collapse v-model="activeNames1">
                                <van-collapse-item v-for="(item1,key1) in diseaseList" :key="key1" :title="item1.title" :name="item1.name">
                                    <van-collapse v-model="activeNames2">
                                        <van-collapse-item v-for="(item2,key2) in item1.child" :key="key2" :title="item2.title" :name="item2.name">
                                            <div v-for="(item3,key3) in item2.child" :key="key3" class="disDiv" @click="goDiseaseDetail(item3)">{{item3.title}}</div>
                                        </van-collapse-item>
                                    </van-collapse>
                                </van-collapse-item>
                            </van-collapse> -->
                            <div class="tabItem" v-for="(item,key) in diseaseList" :key="key" @click="goDiseaseDetail(item)">
                                <div class="diseaseName">{{item.title}}</div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/findDisease.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/diseaseDetail"){
                vm.$children[0].$refs.main.scrollTop = vm.listscrollTops;
            }else{
                vm.listscrollTops=0;
            }
        });
    }, 
    data() {
        return {
            searchTxt:'',//搜索的内容
            sortList:[{id:1,name:'内科疾病'},
            {id:2,name:'外科疾病'},
            {id:3,name:'妇产科疾病'},
            {id:4,name:'儿科疾病'},
            {id:5,name:'传染病'},
            {id:6,name:'神经病'},
            {id:7,name:'精神病'},
            {id:8,name:'眼科疾病'},
            {id:9,name:'耳鼻咽喉头颈外科疾病'},
            {id:10,name:'口腔科疾病'},
            {id:11,name:'皮肤性病科疾病'}],//分类导航列表
            
            diseaseList:[{id:10101,title:'急性气管-支气管炎',name:'10101'},
            {id:10102,title:'急性上呼吸道感染：以咽炎为主要表现的上呼吸道感染',name:'10102'},
            {id:10103,title:'急性上呼吸道感染：流行性感冒',name:'10103'},
            {id:10104,title:'急性上呼吸道感染：普通感冒',name:'10104'},
            {id:10105,title:'急性上呼吸道感染',name:'10105'}],
            activeNames1:['1','2','3'],
            activeNames2:[],
            listscrollTops:0,//进入详情页时列表滚动的高度
        }
    },
    created() {
        
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        //点击分组
        onClick(){

        },
        //进入疾病详情页
        goDiseaseDetail(item){
            this.$router.push({path:'/diseaseDetail',query:{id:item.id}});
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
.van-collapse-item__content{
            padding:0 15px !important;
        }
.main{
    .mian-sort{
        margin-top:10px;
        background-color: #fff;
        color: #7d7e80;
        .van-list__finished-text{
            background-color:#f5f7f8
        }
        .disDiv{
            line-height: 20px
        }
        .tabItem{
            padding:5px 10px;
            border-bottom: 1px solid #f5f7f8;
            .diseaseName{
                font-size: 16px;
                color: #000;
            }
        }
    }
}
</style>
