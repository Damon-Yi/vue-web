<template>
	<div class="guide">
		<div class="guide_centent" >
			<h4>平安车险</h4>
			<p>发生事故后请立即拨打95511-9报案，理赔专员将根据您的出险情况安排救助。查勘员提供7x24小时现场事故勘察服务，确认事故保险责任、损失情况及费用，并推荐损失修复方案。</p>
			<h4>安盛天平</h4>
			<p>出险后请及时拨打24小时报案/投诉专线95550进行报案。查勘员接到派工后，5分钟内与您取得联系并约定查勘时间，在约定时间内完成查勘服务。需要查勘现场的，市区30分钟内到达、郊区60分钟内到达，如因特殊情况延误，将提前联系您说明情况并得到谅解。</p>
		</div>
	</div>
</template>

<script>
	import { Cell, CellBox } from 'vux'
	export default {
		name:"guide",
	    props: {
	    	
	    },
	    components: {
	    	Cell,
	    	CellBox
	    },
	    data () {
      		return {
      			
      		}	
	    },
	    //实例已经创建完成之后
	  	created(){
      		this.$parent.init();
		},
		//监视
		watch:{

		},
		//组件写入dom结构之前
		mounted(){
			
		},
		//方法对象
    	methods:{
    		
    	}
	}    
</script>

<style>
	.guide{background:#fff;}
	.guide_centent{padding:15px;line-height:28px;font-size:16px;color:#8ca3b5}
    
    
</style>