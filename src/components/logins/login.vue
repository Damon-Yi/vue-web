<template>
    <div class="login">
        <div class="login_bg">
           <img src="../../assets/login_bg.png" />
        </div> 
        <div class="login_centen">
        	<div class="tel_input">
        		<i class="tel_icon"></i>
        		<span><input type="tel" placeholder="输入手机号码"  v-model="phone"/></span>
        	</div>
        	<div class="tel_input">
        		<i class="pasw_icon"></i>
        		<span v-show="eyeshow"><input type="text" placeholder="输入密码" v-model="password" /></span>
        		<span v-show="!eyeshow"><input type="password" placeholder="输入密码" v-model="password" /></span>
        		<i class="yan" :class="eyeshow?'off':'hine'" @click="eyeshow=!eyeshow"></i>
        	</div>
        	
        	<div class="loginBut">
		        <x-button type="primary" action-type="button" @click.native="login">登录</x-button>
	        </div>
	        
	        <div class="jump_but">
	        	<span class="fl_left">
	        		<router-link :to="{path:'/register',query: {}}">注册新用户</router-link>
	        	</span>
	        	<span class="fl_right">
	        		<router-link :to="{path:'/forgetPasw',query: {}}">忘记密码</router-link>
	        	</span>
	        </div>
	         
	       <div class="quick_login">
	       	    <router-link :to="{path:'/login2',query: {}}">
	       	  		<span>快捷登录</span>
	       	    </router-link>
	       </div>
        </div>
    </div>

</template>

<script>
	import { XButton} from 'vux'
	import cookie from '../../config/cookie' 
    export default {
	  	name: 'login',
	    props: {
	    },
	    components: {
	    	XButton
	    },
	    data () {
		    return {
		        phone:'',
		        password:'',
		        myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
		        eyeshow:false,
		    }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
	    //计算属性
	    mounted:function(){

	    },
	    //方法对象
	    methods:{
	    	login(){
	    		var _this=this;
		  		if(this.phone!==""&&this.myreg.test(this.phone)&&this.password!==""){
					_this.$http.post(this.$root.url+"member/login", {
		    			phone: this.phone,
		    			password: this.password,
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
//				        emulateJSON: false
				    }).then(function(data) {// 这里是处理正确的回调
				    	console.log(data)
				        var datas=data.body.data;
				        if(data.body.ask==0&&datas){
				        	cookie.Cookie.set("token",datas.token);
				        	this.$router.push({path:'/',query: {}})//跳转路由模块
				        }
				
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });	
            	}else{
            		alert("内容不能为空或格式错误")
            	}
	    	}
	    }
	
	}
</script>

<style scoped>
	input, textarea {-webkit-appearance: none;outline: none;}
	.login_bg{height:auto;width:100%;}
	.login_bg img{width:100%;height:100%;display: block;}
    .login_centen{background:#fff;padding:20px}
    .login_centen .tel_input{display: -webkit-box;display: -ms-flexbox;display: flex;border-bottom: 1px solid #D9D9D9;padding:15px 10px 5px;}
    .login_centen .tel_input i.tel_icon{width:30px;height:30px;background:url(../../assets/login_sj_icon.png) no-repeat left center;background-size:18px 25px;margin-right:5px;}
    .login_centen .tel_input span{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: left;}
    .login_centen .tel_input span input{height:35px;line-height:35px;width:100%;border:none;font-size:16px;}
    
    .login_centen .tel_input i.pasw_icon{width:30px;height:30px;background:url(../../assets/login_ys_icon.png) no-repeat left center;background-size:20px 18px;margin-right:5px;}
    .login_centen .tel_input i.yan{width:40px;height:auto;display: inline-block;text-align: center;}
    .login_centen .tel_input i.hine{background:url(../../assets/yan_icon.png) no-repeat center center;background-size:40px auto;}
    .login_centen .tel_input i.off{background:url(../../assets/QM_icon.png) no-repeat center center;background-size:40px auto;}
    
    .loginBut{width:100%;margin:auto;padding:25px 0 10px;margin-top:20px;}
    .jump_but{width:100%;padding:10px 0;}
    .jump_but:after{clear:both;content: '';display: block;}
    .jump_but .fl_left{float:left;color:#A9B2B9}
    .jump_but .fl_right{float:right;color:#A9B2B9}
    .jump_but .fl_left a,.jump_but .fl_right a{color:#A9B2B9}
    .quick_login{margin-top:40px;text-align: center;padding:10px 0;font-size:16px;color:#2591FF}
    .quick_login span{display: inline-block;color:#2591FF;width:100px;padding-left: 20px;background:url(../../assets/login_ksj_icon.png) no-repeat left center;background-size:25px 25px;}
    
    
</style>
<style>
	.loginBut .weui-btn_primary {background-color: #2491ff !important;}
</style>