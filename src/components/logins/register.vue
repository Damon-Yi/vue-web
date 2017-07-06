<template>
	<div class="register">
		<div class="register_banner">
			<img src="../../assets/register_banner.png" />
		</div>
		<div class="register_title">绑定资料</div>
  	    <div class="register_input">
  	    	<x-input class="weui-vcode" placeholder="输入身份证号码" v-model="idCard" type="number"></x-input>
	        <x-input class="weui-vcode" placeholder="请输入手机号码" v-model="phone" type="tel"></x-input>
	        <x-input class="weui-vcode" placeholder="请输入验证码" v-model="verify" type="text" :min="6" :max="6">
	        	<x-button slot="right" type="primary" mini @click.native="verifybut">发送验证码</x-button>
	        </x-input>
	        
	        <div class="vux-x-input weui-cell weui-vcode">
	        	<div class="weui-cell__bd weui-cell__primary">
	        		<input placeholder="请设置新密码" v-show="eyeshow" type="text" v-model="password" class="weui-input">
	        		<input placeholder="请设置新密码" v-show="!eyeshow" type="password" v-model="password" class="weui-input">
	        	</div> 
	        	<div class="weui-cell__ft" @click="eyeshow=!eyeshow">
	        	    <span class="yan " :class="eyeshow?'off':'hine'"></span>
	        	</div>
	        </div>
  	    </div>
  	    
		<div class="setpaswbuts">
			 <x-button type="primary" action-type="button" @click.native="setpasw">绑定身份到车险贷</x-button>
		</div>
		<div class="logins_but">
			<span>已有账号？<router-link :to="{path:'/login',query: {}}">马上登录</router-link></span>
		</div>
	</div>
</template>

<script>
	import { XInput, XButton} from 'vux'
	import axios from 'axios'
	
	export default{
		name: 'register',
    	components: {
		    XInput,
		    XButton
		}, 
		data () {
		    return {
		       idCard:'',//身份证
		       phone:'',//预留手机号
		       verify:'',//验证码
		       password:'',  //密码
		       eyeshow:false,
		       myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
		       isIDCard1:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
		    }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
           
		},
	    //方法对象
	    methods:{
		  	
            //获取验证码
            verifybut(){
            	var _this=this;
            	if(this.phone!==""&&this.myreg.test(this.phone)){
					_this.$http.post(this.$root.url+"member/securityCode", {
		    			"phone": this.phone,
			            "type":1
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
//				        emulateJSON: false
				    }).then(function(data) {// 这里是处理正确的回调
				
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
            	}else{
            		alert("手机号码不能为空或格式错误")
            	}
            },
            //注册绑定
            setpasw(){
            	var _this=this;
		  		if(this.phone!==""&&this.myreg.test(this.phone)&&this.idCard!==""&&this.isIDCard1.test(this.idCard)&&this.password!==""&&this.verify!==""){
					_this.$http.post(this.$root.url+"member/register", {
		    			"phone": this.phone,
		    			"idCard": this.idCard,
		    			"password": this.password,
		    			"securityCode": this.verify
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
//				        emulateJSON: false
				    }).then(function(data) {// 这里是处理正确的回调
				    	console.log(data)
				        var datas=data.body;
				        if(datas.ask==0&&datas.code=="0000"){
				        	this.$router.push({path:'/',query: {}})//跳转路由模块
				        }

				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
            	}else{
            		alert("内容不能为空或格式错误")
            	}
		  	}
		    
		},
		//计算属性
		computed:{
           
        }
	    
	}
	
</script>

<style scoped>
	input, textarea {-webkit-appearance: none;outline: none;}
	.register_input{background:#fff;}
	.register{background:#fff;padding-bottom: 25px;}
	.register_banner{width:100%;height:auto;}
	.register_banner img{width:100%;height:100%;display: block;}
	.register_title{padding:10px 20px 10px 45px;position:relative;font-size:18px;color:#2591ff}
	.register_title:before{content: " ";height:30%;width:3px;position:absolute;left:25px;top:35%;color:#2591FF;bottom:0;right:15px;background:#2591FF;}

	.register_input .weui-vcode .weui-cell__ft span.yan{width:55px;height:25px;line-height:25px;display: inline-block;text-align: center;}
    .register_input .weui-vcode .weui-cell__ft span.hine{background:url(../../assets/yan_icon.png) no-repeat left center;background-size:35px auto;}
    .register_input .weui-vcode .weui-cell__ft span.off{background:url(../../assets/QM_icon.png) no-repeat left center;background-size:35px auto;}
	
	.setpaswbuts{width:80%;margin:auto;padding:30px 0 20px}
	.logins_but{padding:10px 0 15px;margin:0 auto;text-align: center;color:#C8C8CD;}
	.logins_but span a{color:#2591FF;}
	
	
</style>
<style>
	.setpaswbuts .weui-btn_primary {background-color: #2491ff !important;}
	.register_input .weui-cell:before{border:none;}
	.register_input .weui-cell:after {content: " ";position: absolute;bottom: 0;right:20px;height: 1px;border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5); left: 20px;}
    .register_input .weui-cell{padding:15px 20px;}
    .register_input .weui-btn_primary{background:none;border:2px solid #2490FF;color:#2490FF}
    .register_title:after{content: " ";position: absolute;bottom: 0;right: 20px;height: 1px;
    border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;
    transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);left: 20px;}
</style>