<template>
	<div class="questions">
		<div class="questions_list" v-for="(val,index) in list">
			<cell :title="val.title" is-link :border-intent="false"
	        :arrow-direction="showContent==index ? 'up' : 'down'" @click.native="showContentBut(index)"></cell>
	
		    <template v-if="showContent==index">
		        <cell-box :border-intent="false" class="sub-item">{{val.text}}</cell-box>
		    </template>
		</div>
	</div>
</template>

<script>
	import { Cell, CellBox } from 'vux'
	export default {
	    props: {
	    	
	    },
	    components: {
	    	Cell,
	    	CellBox
	    },
	    data () {
      		return {
      			showContent:"",
      			list:[{title:"1.可投保地区和保险公司",text:"可投保地区和保险公司可投保地区和保险公司"},
      			{title:"2.投保所需资料",text:"投保所需资料投保所需资料"},
      			{title:"3.如何选择适合自己的保障",text:"如何选择适合自己的保障如何选择适合自己的保障"},
      			{title:"4.为何今年商业险的价格比去年上涨/ 下降了",text:"为何今年商业险的价格比去年上涨为何今年商业险的价格比去年上涨"},
      			{title:"5.为什么没有报价",text:"为什么没有报价为什么没有报价"},
      			]
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
    		//点击当前
    		showContentBut(inds){
    			this.showContent = inds;
    		}
    	}
	}    
</script>

<style>
	.questions{background:#fff;}
	.questions .weui-cell:before {content: " ";position: absolute;left: 0;top: 0;right: 0;height: 1px;
    border-top: 1px solid #d9d9d9;color: #d9d9d9;
    -webkit-transform-origin: 0 0; transform-origin: 0 0;
    -webkit-transform: scaleY(.5);transform: scaleY(.5);left: 0;}
    
    
</style>