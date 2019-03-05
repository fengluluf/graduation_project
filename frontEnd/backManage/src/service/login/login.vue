<template>
    <div class="login">
        
    </div>
</template>
<script>
import pageData from "../../api/login/login.js"
// import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'

export default {
    data() {
        return {
            userName: '',
            password: '',
            agree: true,
            submiting: false,
            disabled: false,
            errorMsg:"",
        }
    },
    created() {
        
    },
    methods: {
        
    },
    components: {
    }
}
</script>
<style scoped>
.login{
    padding:40px;
    height:100%;
    background:#fafafa;
    box-sizing: border-box;
}

</style>
