import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './config/router'
import store from './config/store'
import vuetify from './plugins/vuetify'
import vuethemask from './plugins/vuethemask'
import './plugins/axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuethemask,
  vuetify,
  render: h => h(App)
}).$mount('#app')
