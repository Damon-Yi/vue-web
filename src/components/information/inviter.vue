<template>
	<div class="inviter">
  	    <div class="input_centent">
	        <x-input title="我的邀请人" class="weui-vcode" placeholder="请填写您的邀请人手机号码" v-model="phone"></x-input>
  	    </div>
  	    
		<div class="buttons">
			 <x-button type="primary" action-type="button" @click.native="applybuts">提交</x-button>
		</div>
		
	</div>
</template>

<script>
	import { XInput, XButton} from 'vux'
	import cookie from '../../config/cookie' 
	
	export default{
		name: 'inviter',
    	components: {
		    XInput,
		    XButton
		}, 
		data () {
		    return {
		       phone:'',//预留手机号
		       myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
		       token:'',//token值
		        
		    }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
           this.token=cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';
		},
	    //方法对象
	    methods:{
	    	//提交
		  	applybuts(){
		  		var self=this;
		  		if(this.phone!==""&&this.myreg.test(this.phone)&&this.verify!==""){
		  			self.$http.post(this.$root.url+"member/fillInviter", {
		    			"recommender": this.phone
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token}
				    }).then(function(data) {// 这里是处理正确的回调
						console.log(data)
			         	var datas=data.body;
				        if(datas.ask==0&&datas.code=="0000"){
				        	console.log(datas.data)
				        	cookie.Cookie.set("token",datas.data.token);
				        	this.$router.push({path:'/personal',query: {}})//其中login是你定义的一个路由模块
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
	.input_centent{padding:5px 0px 10px;}
	.inviter{background:#fff;}
	
	.buttons{width:60%;margin:auto;padding:25px 0 20px}
	
</style>
<style>
	.buttons .weui-btn_primary {background-color: #2491ff !important;}
	.input_centent .weui-cell:before{border:none;}
	.input_centent .weui-cell:after {content: " ";position: absolute;bottom: 0;right: 15px;height: 1px;border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5); left: 15px;}
    .input_centent .weui-cell{padding:15px;}
    .input_centent .weui-btn_primary{background:none;border:2px solid #2490FF;color:#2490FF}
</style>