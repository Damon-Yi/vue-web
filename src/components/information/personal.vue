<template>
	<div class="presonal">
		<div  class="pretop_bg">
	      	<div class="pretop_center" @click="presolink">
	      		<p class="tops_icon"><img  src="../../assets/atprice.png"></p>
	      		<p class="names">{{memberName}}</p>
	      	</div>
	    </div>
	    
	    <div class="cards">
	    	<div  class="card-demo-content01">
	    		<router-link :to="{path:'/order',query: {orderStatus:''}}">
			        <div class="vux-1px-r">
			          <span></span>
			          <p>全部</p>
			        </div>
		        </router-link>
		        <router-link :to="{path:'/order',query: {orderStatus:'0'}}">
			        <div class="vux-1px-r">
			          <span><i v-if="orderNuber">{{orderNuber}}</i></span>
			          <p>未完成</p>
			        </div>
		        </router-link>
		        <router-link :to="{path:'/order',query: {orderStatus:'1'}}">
			        <div class="vux-1px-r">
			          <span></span>
			          <p>已完成</p>
			        </div>
		        </router-link>
		        <router-link :to="{path:'/order',query: {orderStatus:'15'}}">
			        <div>
			          <span></span>
			          <p>已取消</p>
			        </div>
		        </router-link>
		    </div>
	    </div>
	    
	    <div class="list_link">
			<cell :title="'我的贷款'" is-link link="/myloan">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/wddk_icon.png">
		    </cell>
		    <!--<cell :title="'我的保单'" is-link>
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/wdbd_icon.png">
		    </cell>
		    <cell :title="'我的消息'" is-link link="/news">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/wdxx_icon.png">
		    </cell>-->
		    <cell :title="'我的二维码'" is-link :link="myQcodeUrl">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/wdqcode_icon.png">
		    </cell>
		    <cell :title="'邀请记录'" is-link link="/inviteRecode">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/wdrecode_icon.png">
		    </cell>
	    </div>
	    
	    <!--<tabbar>
	        <tabbar-item link="/">
	        	<img slot="icon" src="../../assets/icon_sy2.png">
	        	<span slot="label">首页</span>
	        </tabbar-item>
	        <tabbar-item>
	        	<img slot="icon" src="../../assets/icon_dd2.png">
	        	<span slot="label">订单</span>
	        </tabbar-item>
	        <tabbar-item selected>
	        	<img slot="icon" src="../../assets/icon_wd1.png">
	        	<span slot="label">我的</span>
	        </tabbar-item>
	    </tabbar>-->
	    
	</div>
	
</template>

<script>
import { Tabbar, TabbarItem,Cell } from 'vux'
import cookie from '../../config/cookie' 
/*组件*/
export default {
  	name: 'personal',
    components: {
	    Tabbar,
	    TabbarItem,
	    Cell
  	},
    data () {
	    return {
	       url:"",
	       token:'',//获取token
	       memberName:'',//用户名
	       orderNuber:'',//未完成统计数据
	       myQcodeUrl:''
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
	        console.log(data)
	        if(data.body.ask==0&&datas&&datas.memberInfo){
        		this.memberName = datas.memberInfo.memberName;
        		this.myQcodeUrl = '/myQcode?phone='+datas.memberInfo.phoneNo;
        		
        		console.log(this.phone)
    		}

	    }, function(error) {// 这里是处理错误的回调
	        console.log(error)
	    });
	    //请求数据统计
	    this.$http.post(this.$root.url+"order/count", {
	    	"orderStatus":0
		}, {
	        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
	    }).then(function(data) {// 这里是处理正确的回调
	        var datas=data.body.data;
	        console.log(data)
	        if(data.body.ask==0&&datas){
        		this.orderNuber = datas;
    		}
	    }, function(error) {// 这里是处理错误的回调
	        console.log(error)
	    });
	    
	},
	//方法
    methods:{
	  	presolink(){
            this.$router.push({path:'/message',query: {}})//其中login是你定义的一个路由模块
	  	}
	}
  
}

</script>

<style scoped>
	.presonal{padding-bottom: 53px;}
	.pretop_bg{position:relative;overflow:hidden;}
	.pretop_bg .pretop_center{text-align: center;color: #fff;padding:35px 0px 10px;font-size: 18px;background:#fff url(../../assets/person_bg.png) no-repeat center center;background-size:cover;}
	.pretop_bg .pretop_center .tops_icon{margin-top:25px;}
	.pretop_bg .pretop_center .tops_icon img{width: 70px;height: 70px;border-radius: 50%;border:2px solid #fff;}
    .pretop_bg .pretop_center .names{color:#434f5d;padding:5px 0px 10px;}
    
    .cards{background:#fff;margin-top:15px;}
	.cards .card-demo-content01{padding: 10px 0;display: -webkit-box;display: -webkit-flex;display: flex;}
	.cards .card-demo-content01>a{-webkit-box-flex: 1;-webkit-flex: 1;flex: 1;text-align: center;font-size: 16px;color:#a8b1b6}
    .cards .card-demo-content01>a div span{font-size: 14px;color:#434f5d;position:relative;width:25px;height:25px;margin:0 auto;display: inline-block;background:url(../../assets/wdbd_icon.png) no-repeat center center;
    background-size:20px 20px;}
    .cards .card-demo-content01>a div span i{width:18px;height:18px;line-height:18px;background:#fe0000;border-radius:50%;position:absolute;top:-3px;right:-10px; font-style:normal;font-size:10px;color:#fff;}

    .list_link{background:#fff;margin-top:15px;}
   


</style>
<style>
	.list_link .weui-cell{padding:15px;}
</style>
