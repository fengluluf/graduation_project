<template>
    <div class="share">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="找药品" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="mian-sort">
                    <van-tabs color="#28b8a1" ellipsis animated @click="onClick">
                        <van-tab v-for="(item,key) in sortList" :title="item.name" :key="key">
                            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" :offset="50"
                            @load="listUpload"
                            class="drugs-list" >
                                <div class="tabItem" v-for="(item,key) in drugsList" :key="key" @click="goDrugsDetail(item)">
                                    <div class="drugsName">{{item.name}}</div>
                                    <div class="drugsInstructions">{{item.instructions}}</div>
                                    <div class="drugsEfficacy">{{item.efficacy}}</div>
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
import pageData from "../../api/home/findDrugs.js"
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
            searchTxt:'',//搜索的内容
            loading: false,
            finished: false,
            allowLoadMore:true,
            drugsData:{ 
                pageNo:1,
                pageSize:10,
            },
            sortList:[{id:2,name:'感冒用药'},{id:3,name:'解热镇痛'},{id:4,name:'镇咳化痰'},{id:5,name:'清咽消暑'},{id:6,name:'抗菌消炎'}],//分类导航列表        
            drugsList:[{id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'},
            {id:1,name:'感冒清热冲剂',instructions:'开水冲服',efficacy:'感冒发热、咳嗽头痛、咽喉肿痛'}],//药品列表数据
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
        onClick(){

        },
        tabScroll(item){
            item.isFixed = true;
        },
        //滚动条与底部距离小于 offset 时触发
        listUpload(){
            if(this.allowLoadMore) {
                this.drugsData.pageNo++;
                this.drugsRequest();
                this.allowLoadMore = false;
            }
            setTimeout(() => {
                this.allowLoadMore = true
            }, 2000);
        },
        //请求推荐列表
        drugsRequest(){
            var _this = this;
            pageData.drugsRes(this.drugsData).then(function (res) {
                _this.loading = false;
                if(res.resultCode == 200) {
                    if(!res.resultJson.pageContent.length){
                       _this.finished = true;
                       return;
                    }
                    if(res.resultJson.pageNum === 1) {
                        _this.drugsList = res.resultJson.pageContent;
                    } else {
                        for(var i=0;i<res.resultJson.pageContent.length;i++){
                            if(JSON.stringify(_this.drugsList).indexOf(JSON.stringify(res.resultJson.pageContent[i])) == -1){
                                _this.drugsList = _this.drugsList.concat(res.resultJson.pageContent);
                            }
                        }
                    }
                    _this.allowLoadMore = true;
                }else{
                     _this.$toast(res.resultMessage);
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
