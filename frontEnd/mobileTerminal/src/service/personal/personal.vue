<template>
    <div class="personal">
        <Layout :active="active">
            <div slot="header" class="header">
                <van-nav-bar title="我的">
                    <van-icon name="setting-o" slot="right" />
                </van-nav-bar>
            </div>
            <div slot="main"></div>
            <div slot="footer"></div>
        </Layout>
    </div>
</template>
<script>
// import pageData from "../../api/personal/personal.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            active:0,//选中的底部导航
            searchTxt:'',//搜索的内容
        }
    },
    created() {
        
    },
    methods: {
    },
}
</script>
<style scoped lang="less">
.van-icon{
    color:#28b8a1
}
</style>
