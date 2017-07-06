// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import cookie from './config/cookie'

Vue.use(VueResource)
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false

//拦截器
Vue.http.interceptors.push(function(request, next)  {
  var _this=this;
  _this.$parent.loadingB = true;

  let TOKEN=cookie.Cookie.get("token");
  //console.log(TOKEN)
  if(TOKEN){
    request.headers.set('token',TOKEN);
  }
  next(function(response)  {
    _this.$parent.loadingB = false;
     return response
  });
});


/* eslint-disable no-new */
import {Loading} from 'vux'
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  data () {
    return{
      //全局变量

      url:'http://10.80.2.20:8080/bil-web/',
      //url:'http://10.83.20.157:8085/bil-web/',
      token:''
    }
  }
})


