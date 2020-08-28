import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/plugins/resource'
import '@/plugins/notifications'
import '@/plugins/mask'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')
