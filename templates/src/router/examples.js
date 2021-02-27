
/**
 * 例子的路由
 * @module examples
 * @author zhanghuan
 * @date 2021/02/26
 */

const routes = [{
    path: '/searchTable',
    name: 'SearchTable',
    component: () => import( /* webpackChunkName: "searchTable" */ '@/views/examples/SearchTable.vue')
}]

export default routes