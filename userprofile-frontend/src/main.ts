import Vue from 'vue'
import App from './App.vue'
import router from './router'
import themeService from '@/services/themeService';

Vue.config.productionTip = false;

themeService.initTheme();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
