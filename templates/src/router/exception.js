/**
 * author: zhanghuan
 * created: 2020/05/08
 * describe: 异常页面
 */
const routes = [{
    path: '/403',
    component: () => import( /* webpackChunkName: "403" */ '@/views/exception/403')
}, {
    path: '/404',
    component: () => import( /* webpackChunkName: "404" */ '@/views/exception/404')
}, {
    path: '/500',
    component: () => import( /* webpackChunkName: "500" */ '@/views/exception/500')
}]

export default routes