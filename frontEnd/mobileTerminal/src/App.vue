<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
    box-sizing: border-box;
    padding:0;
    margin:0;
    font-family: STXihei;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 32px;/*px*/
    margin:0;
    padding:0;
    height:100%;
    /* overflow-y: auto; */
}
html, body {
    height: 100%;
    padding:0;
    margin:0;
}
.mint-datetime-confirm{
    color: #b99052;
}
.mint-datetime-cancel{
    color: #999;
}
</style>
