<template>
	<div class="activity">
		更多活动，敬请期待
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
</style>