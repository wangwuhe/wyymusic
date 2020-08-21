import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';

import './assets/base.scss'
import './assets/fonts/iconfont.css'

//处理时长
Vue.filter('Setsj',(duration)=>{
  let min=parseInt(duration/1000/60)
  if(min<10){
    min='0'+min;
  }
  let sec=parseInt(duration/1000%60)
  if(sec<10){
    sec='0'+sec;
  }
  return duration=`${min}:${sec}`
})
Vue.filter('Setsl',(playCount)=>{
  if(playCount>100000){
    playCount=parseInt(playCount/10000)+'w'
  }
  return playCount
})
Vue.filter('chuli', (time)=>{
  return moment(time).format('YYYY-MM-DD hh:mm:ss');
})

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
