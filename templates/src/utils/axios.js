/**
 * author: zhanghuan
 * created: 2020/3/31
 * describe: ajax的封装
 */
import Vue from 'vue'
import axios from 'axios'
import { Modal, notification } from 'ant-design-vue'

// 创建 axios 实例
const service = axios.create({
    /* headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}, */
	timeout: 60 * 1000 // 请求超时时间
})

// 在发送请求之前做某件事(添加请求拦截器)
service.interceptors.request.use(
	config => {
		const token = Vue.ls.get(window._CONFIG.tokenKey)
		if (token) {
			config.headers = Object.assign(config.headers, {
                'access-token': token, // 让每个请求携带自定义 token 请根据实际情况自行修改
                'withCredentials': true, // 允许后台获取cookie
			})
		}
		if (config.method === 'get') {
			config.params = {
				_: Date.parse(new Date()) / 1000, //get方法加时间标识，防止缓存
				...config.params
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
	response => {
        if (response.data.code !== 200) {
            notification.error({
                message: '系统提示',
                description: response.data.msg
            })
        }
		return response.data
	},
	error => {
		if (error.response) {
			let data = error.response.data
			const token = Vue.ls.get(window._CONFIG.tokenKey)
			switch (error.response.status) {
				case 403:
					notification.error({
						message: '系统提示',
						description: '拒绝访问',
						duration: 4
					})
					break
				case 500:
					if (token && data.msg == 'Token失效，请重新登录') {
						Modal.error({
							title: '登录已过期',
							content: '很抱歉，登录已过期，请重新登录',
							okText: '重新登录',
							mask: false,
							onOk: () => {
								//跳转到登录页面
							}
						})
					}
					break
				case 404:
					notification.error({
						message: '系统提示',
						description: '很抱歉，资源未找到!',
						duration: 4
					})
					break
				case 504:
					notification.error({
						message: '系统提示',
						description: '网络超时'
					})
					break
				case 401:
					notification.error({
						message: '系统提示',
						description: '未授权，请重新登录',
						duration: 4
					})
					if (token) {
						//跳转到登录页面
					}
					break
				default:
					notification.error({
						message: '系统提示',
						description: data.msg,
						duration: 4
					})
					break
			}
		}
		return Promise.reject(error)
	}
)


export default {
    install(Vue) {
        Vue.prototype.$axios = service
    }
}
