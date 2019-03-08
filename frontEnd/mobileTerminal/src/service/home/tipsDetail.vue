<template>
    <div class="tipsDetail">
        <Layout>
            <div slot="header" class="header">
                <van-nav-bar :title="title" @click-left="onClickLeft">
                    <van-icon name="arrow-left" slot="left" />
                </van-nav-bar>
            </div>
            <div slot="main">
                
            </div>
            <div slot="footer"></div>
        </Layout>
    </div>
</template>
<script>
// import pageData from "../../api/home/tipsDetail.js"
import "../../assets/style/font-icon/iconfont.css"
import Layout from "../../components/layout/layout1.vue"
import base from '../../util/base'

export default {
    components:{Layout},
    data() {
        return {
            title:'',
            articleId:''
        }
    },
    created() {
        if(this.$route.query.id){
            this.articleId = this.$route.query.id;
            this.title = '健康贴士' + this.$route.query.id
            console.log(this.title)
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
    },
}
</script>
<style scoped lang="less">
.van-icon{
    color: #28b8a1
}
</style>
