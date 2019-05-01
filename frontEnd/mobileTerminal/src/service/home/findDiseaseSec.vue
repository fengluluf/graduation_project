<template>
    <div class="share">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="查疾病" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="mian-sort">
                    <van-tabs color="#28b8a1" ellipsis animated @click="getDiseaseList" sticky scroll="{scrollTop:146px,isFixed:true}">
                        <van-tab v-for="(item,key) in sortList" :title="item.diseasename" :key="key">
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
                                <div class="diseaseName">{{item.diseaseName}}</div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/findDiseaseSec.js"
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
            sortList:[],//分类导航列表
            diseaseList:[],//疾病三级分类列表
            activeNames1:['1','2','3'],
            activeNames2:[],
            listscrollTops:0,//进入详情页时列表滚动的高度
        }
    },
    created() {
        this.diseaseRequest();
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
         //点击分组
        getDiseaseList(firstSort){
            this.diseaseList = [];
            var _this = this;  
            var sortId;
            if(firstSort){
                sortId = firstSort;
            }else{
                this.sortList.forEach(function(ele,index){
                    if(index == _this.active){
                        sortId = ele.id;
                    }
                })
            }
            var data = {diseasecate2:sortId}
            pageData.getDiseaseList(data).then(function (res) {
                if(res.resultcode == "0000") {
                    if(res.data.result == "00"){
                        _this.diseaseList = res.data.array
                    }else{
                        _this.$toast(res.data.text);
                    }
                }else{
                     _this.$toast(res.data.text);
                 }
            })
        },
        //请求推荐列表
        diseaseRequest(){
            var _this = this;  
            var data = {diseasecate:this.$route.query.id}
            pageData.getSortList(data).then(function (res) {
                if(res.resultcode == "0000") {
                    if(res.data.result == "00"){
                        _this.sortList = res.data.array;
                        _this.getDiseaseList(_this.sortList[0].id);
                    }else{
                        _this.$toast(res.data.text);
                    }
                }else{
                     _this.$toast(res.data.text);
                 }
            })
        },
        //进入疾病详情页
        goDiseaseDetail(item){
            this.$router.push({path:'/diseaseDetail',query:{id:item.id}});
            this.listscrollTops = this.$children[0].$refs.main.scrollTop;
        }
    },
}
</script>
<style lang="less">
.van-icon{
    color:#28b8a1!important;
}
.van-collapse-item__content{
    padding:0 15px !important;
}
.van-tabs--line .van-tabs__wrap{
    position: fixed!important;
    top: 45px!important;
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);
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
                font-size: 14px;
                color: #000;
            }
        }
    }
}
</style>
