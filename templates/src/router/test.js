/**
 * author: zhanghuan
 * created: 2020/3/31
 * describe: 测试例子的路由
 */

const routes = [{
    path: '/test',
    name: 'Test',
    component: () => import( /* webpackChunkName: "403" */ '@/views/test/Test.vue')
}]

export default routes