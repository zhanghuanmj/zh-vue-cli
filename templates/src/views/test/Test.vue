<!--
 * 测试
 * @module test
 * @author zhanghuan
 * @date 2021/01/30
-->
<template>
    <div>
        测试
        <div>
            <router-link to="/searchTable">带检索的列表</router-link>
        </div>
    </div>
</template>

<script>
    import api from '@/apis/test'

    export default {
        name: "test",
        data() {
            return {
                
            }
        },
        methods: {
            getData() {
                // 服务器接口
                this.$axios.get(api.getData, { params: { type: 'move', ak: 'kgD2HiDnLdUhwzd3CLuG5AWNfX3fhLYe', adminType: 'country', name: '中国' } }).then(res => {
                    console.log(res)
                })
                // 假数据接口
                this.$axios.get(api.menu).then(res => {
                    console.log(res)
                    return res
                }).then(val => {
                    console.log('v', val)
                })
            },
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped lang="less">

</style>