<template>
    <div class="login2">
        <div class="login2_bg">
           <img src="../../assets/login_bg.png" />
        </div> 
        <div class="login2_centen">
        	<div class="tel_input">
        		<i class="tel_icon"></i>
        		<span><input type="tel" placeholder="输入手机号码" v-model="phone" /></span>
        	</div>
        	<div class="tel_input">
        		<i class="pasw_icon"></i>
        		<span><input type="text" placeholder="输入验证码" v-model="verify" /></span>
        		<p class="verifybut" @click="verifybut">发送验证码</p>
        	</div>
        	
        	<div class="loginBut">
		        <x-button type="primary" action-type="button" @click.native="login2">登录</x-button>
	        </div>
	        
	        <div class="jump_but">
	        	<span class="fl_left">
	        		<router-link :to="{path:'/register',query: {}}">注册新用户</router-link>
	        	</span>
	        	<span class="fl_right">
	        		<router-link :to="{path:'/forgetPasw',query: {}}">忘记密码</router-link>
	        	</span>
	        </div>
	         
	       <div class="pasw_login">
	       	    <router-link :to="{path:'/login',query: {}}">
	       	  		<span>密码登录</span>
	       	    </router-link>
	       </div>
        </div>
        <toast v-model="toastshow" type="text" width="20em">{{showtext}}</toast>
    </div>

</template>

<script>
	import { XButton,Toast} from 'vux'
	import cookie from '../../config/cookie' 
    export default {
	  	name: 'login',
	    props: {
	    },
	    components: {
	    	XButton,
	    	Toast
	    },
	    data () {
	      return {
	        phone:'',//预留手机号
		    verify:'',//验证码
		    toastshow:false,
		    showtext:'验证码已经发送，请注意查收短信!',
		    myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
	      }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
	    //组件写入dom结构之前s
	    mounted:function(){
	      
	    },
	    //方法对象
	    methods:{
	    	//获取验证码
	    	verifybut(){
	    		var _this=this;
            	if(this.phone!==""&&this.myreg.test(this.phone)){
            		this.toastshow=true;
					_this.$http.post(this.$root.url+"member/securityCode", {
		    			"phone": this.phone,
			            "type":2
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
	    	//快捷登录
		  	login2() {
	      	 	var _this=this;
		  		if(this.phone!==""&&this.myreg.test(this.phone)&&this.verify!==""){
					_this.$http.post(this.$root.url+"member/fastLogin", {
		    			"phone": this.phone,
		    			"securityCode": this.verify
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
		    
		},
		//计算属性
		computed:{
//         console.log(this.$parent.bbd)
        }
	
	}
</script>

<style scoped>
	input, textarea {-webkit-appearance: none;outline: none;}
	.login2_bg{height:auto;width:100%;}
	.login2_bg img{width:100%;height:100%;display: block;}
    .login2_centen{background:#fff;padding:20px}
    .login2_centen .tel_input{display: -webkit-box;display: -ms-flexbox;display: flex;border-bottom: 1px solid #D9D9D9;padding:15px 10px 5px;}
    .login2_centen .tel_input i.tel_icon{width:30px;height:30px;background:url(../../assets/login_sj_icon.png) no-repeat left center;background-size:18px 25px;margin-right:5px;}
    .login2_centen .tel_input span{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: left;}
    .login2_centen .tel_input span input{height:35px;line-height:35px;width:100%;border:none;font-size:16px;}
    .login2_centen .tel_input .verifybut{height:35px;line-height:31px;width:100px;text-align:center;border:2px solid #2490FF;color:#2490FF;border-radius:3px;}
    .login2_centen .tel_input i.pasw_icon{width:30px;height:30px;background:url(../../assets/login_ys_icon.png) no-repeat left center;background-size:20px 18px;margin-right:5px;}


    .loginBut{width:100%;margin:auto;padding:25px 0 10px;margin-top:20px;}
    .jump_but{width:100%;padding:10px 0;}
    .jump_but:after{clear:both;content: '';display: block;}
    .jump_but .fl_left{float:left;color:#A9B2B9}
    .jump_but .fl_right{float:right;color:#A9B2B9}
    .jump_but .fl_left a,.jump_but .fl_right a{color:#A9B2B9}
    .pasw_login{margin-top:40px;text-align: center;padding:10px 0;font-size:16px;color:#2591FF}
    .pasw_login span{display: inline-block;color:#2591FF;width:100px;padding-left: 20px;background:url(../../assets/mmdl_icon.png) no-repeat left center;background-size:25px 25px;}
    
    
</style>
<style>
	.loginBut .weui-btn_primary {background-color: #2491ff !important;}
</style>