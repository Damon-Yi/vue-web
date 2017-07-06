<template>
	<div class="about">
		<div class="about_centent" >
			<p>佰仟金融成立于2013年12月，总部设立在深圳，为全国客户提供消费金融和汽车金融服务。作为哈尔滨银行和众安保险的战略合作伙伴，未来将进一步开拓相关业务领域，提供综合金融解决方案。
佰仟金融秉持着承担、学习、诚信、创新、服务5大文化方针，力求为您提供及时贴心有温度的服务。
为更好满足广大有车一族的需求，佰仟金融现推出车险分期服务，由平安财险、安盛天平等公司承保，方便快捷在线投保，享受6期0息0费起，任何问题请您详询 400-998-7101
佰仟金融，点滴信用，助力平凡梦想！
</p>
		</div>
	</div>
</template>

<script>
	import { CheckIcon  } from 'vux'
	export default {
		name:'about',
	    props: {
	    	
	    },
	    components: {
	    	CheckIcon 
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
	.about{background:#fff;}
	.about_centent{padding:15px;line-height:28px;font-size:16px;color:#8ca3b5}
    
    
</style>