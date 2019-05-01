<template>
    <div class="findDisease">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="查疾病" @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main" class="main">
                <div class="list">
                    <div class="listItem" v-for="(item,key) in diseaseSort" :key="key" @click="goDiseaseSort(item)">
                        <van-row>
                            <van-col span="21">
                                <div class="listCon">{{item.diseasename}}</div>
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
import pageData from "../../api/home/findDisease"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/findDiseaseSec"){
                vm.$children[0].$refs.main.scrollTop = vm.listscrollTops;
            }else{
                vm.listscrollTops=0;
            }
        });
    }, 
    data() {
        return {
            listscrollTops:0,//滚动的高度
            diseaseSort:[]
        }
    },
    created() {
        this.getDiseaseSort()
    },
    methods: {
        //返回上一级
        onClickLeft(){
            this.$router.go(-1)
        },
        //获取疾病一级分类
        getDiseaseSort(){
            var _this = this;
            pageData.diseaseRes().then(function (d) {
                if(d.resultcode == "0000") {
                    _this.diseaseSort = d.data.array;
                    console.log(_this.diseaseSort)
                }else{
                    _this.$dialog.alert({
                        message: d.data.text
                    });
                }
            })
        },
        //进入疾病详情页
        goDiseaseSort(item){
            this.$router.push({path:'/findDiseaseSec',query:{id:item.id}});
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
