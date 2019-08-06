import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//映入echarts
import echarts from 'echarts'
Vue.use(echarts)
// 百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
})
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echart=echarts

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')