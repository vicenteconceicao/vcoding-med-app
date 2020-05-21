import Vue from 'vue'
import axios from 'axios'
import { baseApiUrl } from '../config/global'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL: baseApiUrl
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            return config
        })

        // Vue.prototype.$http.interceptors.response.use(res => {
        //     return res
        // })
    }
})
