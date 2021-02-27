<template>
    <div id="app">
        <a-config-provider :locale="locale">
            <router-view />
        </a-config-provider>
    </div>
</template>
<script>
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';

    moment.locale('zh-cn');

    export default {
        data() {
            return {
                locale: zhCN
            }
        }
    }
</script>
<style lang="less">
    @import '~@/style/base.less';

    #app {
        font-family: 'Open Sans', 'trebuchet ms', Arial, sans-serif, Avenir, Helvetica;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>