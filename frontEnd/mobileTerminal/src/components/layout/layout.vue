<template>
    <div class="layout">
        <div class="headerBox"><slot name="header"></slot></div>
        <div class="mainBox" ref="main"><slot name="main"></slot></div>
        <div class="footerBox"><slot name="footer"></slot></div>
    </div>
</template>

<script>

export default {
    name:"Layout",
    data() {
        return {
            
            // active:0
        }
    },
    created() {
        
    },
    mounted() {
        setTimeout(() => {
            this.resizeMainHeight();
        }, 200)
    },
    methods: {
        resizeMainHeight() {
            let header = document.querySelector('.headerBox');
            let footer = document.querySelector('.footerBox');
            let headerHeight = header ? header.offsetHeight : 0;
            let footerHeight = footer ? footer.offsetHeight : 0;
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight - headerHeight - footerHeight + 'px';
            this.$refs.main.style.marginTop = headerHeight + 'px';
            this.$refs.main.style.height = mainH;
        },
    },
}
</script>

<style scoped>
.headerBox{
    z-index: 1000;
    position: fixed;
    top: 0;
    width: 100%;
    overflow: hidden;
}
.mainBox {
    background-color: #f5f7f8;
    overflow: scroll;
    width:100%;
    -webkit-overflow-scrolling: touch;
}
.footerBox{
    height: 50px;
}
</style>
