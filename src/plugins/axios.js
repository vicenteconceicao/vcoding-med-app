import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL: 'http://192.168.0.14:3333/'
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            console.log(config.method)
            return config
        })

        Vue.prototype.$http.interceptors.response.use(res => {
            return res
        })
    }
})
