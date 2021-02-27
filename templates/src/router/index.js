import Vue from 'vue'
import VueRouter from 'vue-router'
import exception from './exception'
import test from './test'
import examples from './examples'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/test"
    },
    ...examples,
    ...test,
    ...exception,
    {
        path: "*",
        redirect: "/404",
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router