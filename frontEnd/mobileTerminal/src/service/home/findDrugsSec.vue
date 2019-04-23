<template>
    <div class="share">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar :title="query.name" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="mian-sort">
                    <van-tabs color="#28b8a1" ellipsis animated  @click="getDrugsList()" v-model="active">
                        <van-tab v-for="(item,key) in sortList" :title="item.drugname" :key="key">
                            <van-list finished-text="没有更多了" :immediate-check="false" class="drugs-list" >
                                <div class="tabItem" v-for="(item,key) in drugsList" :key="key" @click="goDrugsDetail(item)">
                                    <div class="drugsName">{{item.drugName}}</div>
                                    <!-- <div class="drugsInstructions">{{item.instructions}}</div>
                                    <div class="drugsEfficacy">{{item.efficacy}}</div> -->
                                </div>
                            </van-list>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </Layout>
    </div>
</template>
<script>
import pageData from "../../api/home/findDrugsSec.js"
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
            active:0,
            query:{},//药品一级分类信息
            sortList:[],//分类导航列表        
            drugsList:[{id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},],//药品列表数据
            listscrollTops:0,//滚动的高度
        }
    },
    created() {
        this.drugsRequest();
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        //点击分组
        getDrugsList(firstSort){
            this.drugsList = [];
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
            var data = {drugcate2:sortId}
            pageData.getDrugsList(data).then(function (res) {
                if(res.resultcode == "0000") {
                    if(res.data.result == "00"){
                        _this.drugsList = res.data.array
                    }else{
                        _this.$toast(res.data.text);
                    }
                }else{
                     _this.$toast(res.data.text);
                 }
            })
        },
        tabScroll(item){
            item.isFixed = true;
        },
        //请求推荐列表
        drugsRequest(){
            var _this = this;  
            this.query.name = this.$route.query.name
            var data = {drugcate:this.$route.query.id}
            pageData.getSortList(data).then(function (res) {
                if(res.resultcode == "0000") {
                    if(res.data.result == "00"){
                        _this.sortList = res.data.array;
                        _this.getDrugsList(_this.sortList[0].id);
                    }else{
                        _this.$toast(res.data.text);
                    }
                }else{
                     _this.$toast(res.data.text);
                 }
            })
        },
        //进入药品详情页
        goDrugsDetail(item){
            this.$router.push({path:'/drugsDetail',query:{id:item.id}});
            this.listscrollTops = this.$children[0].$refs.main.scrollTop;
        }
    },
}
</script>
<style lang="less">
.header{
    // box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
}
.van-icon{
    color:#28b8a1!important
}
.main{
    .mian-sort{
        background-color: #fff;
        color: #7d7e80;
        .van-tabs--line .van-tabs__wrap{
            position: fixed!important;
            top: 45px!important;
            box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);
        }
        .van-list__finished-text{
            background-color:#f5f7f8
        }
        .tabItem{
            padding:5px 10px;
            border-bottom: 1px solid #f5f7f8;
            .drugsName{
                font-size: 16px;
                color: #000;
            }
            .drugsInstructions{
                font-size: 14px;
            }
            .drugsEfficacy{
                font-size: 14px;
            }
        }
    }
}
</style>
