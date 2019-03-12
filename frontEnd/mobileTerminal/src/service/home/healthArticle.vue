<template>
    <div class="share">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar title="健康贴士"  @click-left="onClickLeft" left-arrow></van-nav-bar>
            </div>
            <div slot="main"></div>
            <div slot="footer"></div>
        </Layout>
    </div>
</template>
<script>
// import pageData from "../../api/share/share.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            searchTxt:'',//搜索的内容
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
.van-icon{
    color:#28b8a1
}
</style>
