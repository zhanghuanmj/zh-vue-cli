import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import Storage from 'vue-ls'
import './antdImport'
import config from './defaultSettings'

Vue.use(axios)
Vue.use(Storage, config.storageOptions)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

