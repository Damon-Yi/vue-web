<template>
	<div class="qcode">
		<img class="share-qcode" :src="imgBase" alt="">
		<!-- <p class="s-txt">发送你的推广链接，分享跟多的朋友</p>
		<a class="s-link" href="javascript:;">http//:xxxxxxxxxxxx</a> -->
		<div class="share-btn">
			<x-button type="primary" action-type="button" @click.native="saveOrUpdatePlan">点击邀请好友</x-button>
		</div>
		<div>
	        <div v-if="show" class="popup-cus">
		        <div class="share-wrap">
		            <!-- <div class="s-item" @click="shareFun(1)">
		            	<img class="s-img" src="../../assets/wechat.png" alt="">
		            	<p class="s-txt">微信好友</p>
		            </div>
		            <div class="s-item" @click="shareFun(2)">
		            	<img class="s-img" src="../../assets/moments.png" alt="">
		            	<p class="s-txt">朋友圈</p>
		            </div>
		            <div class="s-item" @click="shareFun(3)">
		            	<img class="s-img" src="../../assets/qq.png" alt="">
		            	<p class="s-txt">QQ好友</p>
		            </div> -->
		            <img class="s-img" src="../../assets/share-tips.png" alt="">
		            <p>请点击右上角</p>
					<p>通过【发送给朋友】功能</p>
					<p>或【分享到朋友圈】功能</p>
					<p>把消息告诉小伙伴哟</p>
		        </div>
		        <div class="popup-mask" @click="popupMaskClick"></div>
	        </div>
	    </div>
	</div>
</template>

<script>
import { Cell, XButton, Popup,XSwitch } from 'vux'
import cookie from '../../config/cookie' 
/*组件*/
export default {
  	name: 'myQcode',
  	created () {
  		this.$parent.init();
  		
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
	        WeixinJSBridge.call('showOptionMenu');
	    }
  	},
	mounted () {
		var phone = this.$route.query.phone?this.$route.query.phone:'';
		var vm = this;
        this.$http.post(this.$root.url+"userCenter/getQrCodeUrl",{
        	phoneNo:phone
        }).then(function(res) {//success
           console.log('res',res);
           if(res.ok&&res.body.ask==0){
              	vm.imgBase = 'data:image/png;base64,'+res.body.data.img
           }else{
              this.showTips = true;
              this.showTipsMsg = res.body.message;
           }
        }, function(res) {// fail
           this.showTips = true;
           this.showTipsMsg = res.statusText;
        });

	},
    components: {
	    Cell,
	    XButton,
	    Popup,
	    XSwitch
  	},
    data () {
	    return {
	       url:"",
	       show:false,
	       imgBase:''
	    }
	},
	//方法
    methods:{
	  	saveOrUpdatePlan:function(e){
	  		this.show = true
	  	},
	  	popupMaskClick:function(e){
	  		this.show = false
	  	}
	}
}
</script>

<style scoped>
    .qcode{text-align: center;padding: 100px 0;}
    .qcode .share-qcode{width: 150px;height: 150px;margin: 16px auto;}
    .qcode .s-txt{font-size: 14px;color: #3c444d;}
    .qcode .s-link{font-size: 12px;color: #8ca3b5;}
    .qcode .share-btn{}
    .share-btn{width:90%;margin:auto;padding:25px 0 20px}
    .share-btn .weui-btn_primary {background-color: #2491ff !important;font-size: 16px;}
    .share-wrap{overflow: auto;color: #fff;text-align: right;position: absolute;z-index: 2;width: 100%;top: 0;left: 0;}
    .share-wrap p{text-align: center;}
    .share-wrap .s-img{width: 66px;height: 50px;margin:30px 15px 0;}
    .share-wrap .s-item{width: 33.33%;float: left;text-align: center;padding: 20px 0;color: #3c444d;}
    .share-wrap .s-item .s-img{width: 52px;height: 52px;}
    .share-wrap .s-item .s-txt{}
    .popup-cus{position:absolute;top: 0;left: 0;right: 0;bottom: 0;}
    .popup-cus .popup-mask{position:absolute;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,.5);z-index: 1;}
</style>
<style>
	.qcode .vux-popup-dialog{background-color: transparent;}
</style>
