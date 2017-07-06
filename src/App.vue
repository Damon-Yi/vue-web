<template>
  <div id="app">
  	<div class="contents" :class="{'contents-bottom':!isLogin}">
    	<x-header class="red">佰仟车险</x-header>
    	<router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
    <div class="tab_item" v-if="isLogin">
	    <tabbar>
	      <tabbar-item :selected="index==0" link="/">
	        <img slot="icon" src="./assets/icon_sy2.png">
	        <img slot="icon-active" src="./assets/icon_sy1.png">
	        <span slot="label">首页</span>
	      </tabbar-item>
	
	      <tabbar-item :selected="index==1" link="/activity">
	        <img slot="icon" src="./assets/icon_dd2.png">
	        <img slot="icon-active" src="./assets/icon_dd1.png">
	        <span slot="label">活动</span>
	
	      </tabbar-item>
	      <!--<tabbar-item link="">
	        <img slot="icon" src="../../assets/icon_zd2.png">
	        <span slot="label">账单</span>
	      </tabbar-item>-->
	      <tabbar-item link="/personal" :selected="index==2">
	        <img slot="icon" src="./assets/icon_wd2.png">
	        <img slot="icon-active" src="./assets/icon_wd1.png">
	        <span slot="label">我的</span>
	      </tabbar-item>
	    </tabbar>
    </div>
    <div class="loding">
      <loading v-model="loadingB"></loading>
    </div>
  </div>
</template>

<script>
	import {XHeader,Tabbar,TabbarItem,Loading} from 'vux'
  export default {
    name: 'app',
    components: {
  	    XHeader,
  	    Tabbar,
  	    TabbarItem,
        Loading
  	  },
    data(){
      return {
        loadingB:false,
        index:0,
        urlId:'',
        isLogin:true,
      }
    },
    beforeCreate:function(){
    },
    //获取路由上的值
  	created(){
      //this.init();
  	},
  	beforeMount(){ 
  	},
    mounted:function(){
      //:active
      document.body.addEventListener('touchstart', function () {})
      //日期格式化
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
      /*调用：
       var time1 = new Date().Format("yyyy-MM-dd");
       var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");*/
    },
    methods:{
      init(){
        this.hideOrShowShareBtn();
        this.hideOrShowMenuBar();
      },
      hideOrShowShareBtn(){
        var path = this.$route.path;
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{
          onBridgeReady();
        }
        function onBridgeReady(){
          WeixinJSBridge.call('hideOptionMenu');
        }
      },
      hideOrShowMenuBar(){
        var path = this.$route.path;
        if(path=="/activity"){
          this.index = 1      // 活动
        }else if(path=="/personal" || path=="/message" || path=="/altertel" || path=="/applyModify" || path=="/cardModfy" || path=="/account" || path=="/billist" || path=="/repaymentBill" || path=="/loanContract" || path=="/prepayment" || path=="/myloan" || path=="/inviter" || path=="/news"){
          this.index = 2      //个人中心
        }else{
          this.index = 0     //首页
        }
        
        if(path=="/login" || path=="/login2" || path=="/forgetPasw" || path=="/register" || path=="/myQcode"){
          this.isLogin = false
        }else{
          this.isLogin = true
        }
      }
    }
  }
</script>

<style>
  body, html {height: 100%;overflow-x: hidden;width: 100%;}
  body {font-family: -apple-system-font,Helvetica Neue,sans-serif;line-height: 1.6;background-color: #eef2f9;}
  * {-webkit-tap-highlight-color:transparent;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-webkit-overflow-scrolling:touch;margin: 0;padding: 0;}
  a img {border: 0 none;}
  a {text-decoration: none;}
  .vux-tap-active {-moz-user-select: none;}
  .vux-tap-active:active {background-color: #ececec;}
  
  #app{position:absolute;right:0;left:0;bottom: 0;top:0}
  .full-size{width:100%;height:auto;}
  .full-screen{height:auto;}
  .red{color:red!important;}
  .black{color:black!important;}
  .blue-light{color:#2491ff!important;}
  /*1px 下边框*/
  .one_px_border_b{width:100%;position: relative;}
  .one_px_border_b:after {content: " ";position: absolute;left: 0;bottom: 0;width: 100%;height: 1px;border-bottom: 1px solid #eef0f1;color: #eef0f1;-webkit-transform-origin: 0 100%;transform-origin: 0 100%;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
  .act:active{background: #ececec;}

  /*右键头*/
  .right-arrow{padding-right:15px;position:relative;}
  .right-arrow:before{content: " ";display: inline-block;height: 6px;width: 6px;border-width: 2px 2px 0 0;border-color: #C8C8CD;border-style: solid;-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);position: absolute;top: 50%;margin-top: -4px;right: 2px;}
  .contents{width:100%;position:absolute;overflow:auto;right:0;left:0;bottom:53px;top:0;}
  .contents-bottom{bottom:0;}

  /*select*/
  .select{position:relative;display: inline-block;}
  .select>*{position:relative;border:none;background: none;}
</style>
