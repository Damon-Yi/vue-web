<template>
	<div class="message">
	    
	    <div class="message_list">
			<cell :title="'姓名'" :value="memberName" ></cell>
		    <cell :title="'身份证'" :value="cardNo"></cell>
		    <cell :title="'手机号'" >{{phoneNo}}</cell>
		    <cell :title="'我的邀请人'" v-if="recommender!=''">{{recommender.substring(0, 3) + '****' + recommender.substring(7)}}</cell>
		    <cell :title="'我的邀请人'" v-else is-link link="/inviter"></cell>
	    </div>
	    
	</div>
	
</template>

<script>
	import { Cell } from 'vux'
	import cookie from '../../config/cookie' 
	/*组件*/
	export default {
	  	name: 'message',
	    components: {
		    Cell
	  	},
	    data () {
		    return {
		       memberName:"",//姓名
		       cardNo:"",//身份证号码
		       phoneNo:"",//电话号码
		       recommender:"",//受邀人电话号码
		       token:'',//获取token
		    }
		},
		//实例已经创建完成之后
		created(){
			this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
			this.token=cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';
			
			this.$http.post(this.$root.url+"member/getMemberInfo", {
			}, {
		        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
		    }).then(function(data) {// 这里是处理正确的回调
		        var datas=data.body.data;
		        if(data.body.ask==0&&datas&&datas.memberInfo){
	        		this.memberName = datas.memberInfo.memberName;
	        		this.cardNo = datas.memberInfo.cardNo;
	        		this.phoneNo = datas.memberInfo.phoneNo;
	        		this.recommender = datas.memberInfo.recommender;
	    		}
		    }, function(error) {// 这里是处理错误的回调
		        console.log(error)
		    });
		    
		    
		},
		//方法
	    methods:{
		  	accountbut(){
	            this.$router.push({path:'/applyModify',query: {}})//其中login是你定义的一个路由模块
		  	}
		}
	  
	}

</script>

<style scoped>

    .message_list{background:#fff;margin-top:15px;}


</style>
<style>
	.message_list .vux-label{color:#A9B2B9;}
	.message_list .weui-cell{padding:15px;}
	.message_list .weui-cell__ft{color:#434F5D}
</style>