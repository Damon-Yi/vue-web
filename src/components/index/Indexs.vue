<template>
	  <div class="indexs">
	  	  <div class="swiper_banner">
	  	 	  	<swiper  :aspect-ratio="0.35" loop auto :list="banner_list" :index="banner_index" @on-index-change="banner_onIndexChange"></swiper>
	  	  </div>
	  	 
	  	  <div class="toubao_centen">
		  	 		<div class="butts_go">
		  	 		<router-link :to="{path:'/identity',query: {}}">
		  	 				<x-button plain type="primary" :disabled="isChange" class="buttonweui" is-link link="/identity">立即投保</x-button>
		  	 	  </router-link>
		  	 		</div>
			  	 	<div class="lables">
			  	 		 <div class="lables_cell_hd" :class="[isChange ? '':'selected']" @click="changes">
				  	 		 	<i class="lables_cell_icon"></i>
				  	 		 	<span class="title_hui">理解并接受<router-link :to="{path:'/servuce',query: {}}">《佰仟车险分期服务条款》</router-link></span>
			  	 		 </div>
			  	 	</div>
		  	 		
		  	 	<!--<checklist class="aa"  required :options="commonList" @on-change="changes"></checklist>-->
	  	  </div>
	  	  
	  	  <div class="grid_list">
			  	<grid :rows="2">
						  <grid-item link="/about" class="grid-center">
					        <img slot="icon" src="../../assets/icon_01_gy.png">
					        <span class="grid-text">关于我们</span>
				      </grid-item>
				      <grid-item link="/process" class="grid-center">
					        <img slot="icon" src="../../assets/icon_03_tb.png">
					        <span class="grid-text">投保流程</span>
				      </grid-item>
				      <grid-item link="/guide" class="grid-center">
					        <img slot="icon" src="../../assets/icon_02_lp.png">
					        <span class="grid-text">理赔指南</span>
				      </grid-item>
				      <grid-item link="/questions" class="grid-center">
					        <img slot="icon" src="../../assets/icon_04_cj.png">
					        <span class="grid-text">常见问题</span>
				      </grid-item>
					</grid>
				</div>
	  	
		    <!--<tabbar>
		      <tabbar-item selected>
		        <img slot="icon" src="../../assets/icon_sy1.png">
		        <span slot="label">首页</span>
		      </tabbar-item>
		      <tabbar-item>
		        <img slot="icon" src="../../assets/icon_dd2.png">
		        <span slot="label">订单</span>
		      </tabbar-item>
		      <tabbar-item link="/personal">
		        <img slot="icon" src="../../assets/icon_wd2.png">
		        <span slot="label">我的</span>
		      </tabbar-item>
		    </tabbar>-->
	  </div>
</template>

<script>
	  import { Tabbar, TabbarItem, Grid, GridItem, Swiper, XButton, Checklist} from 'vux'
	  const baseList = [{
//		  url: 'javascript:',
		  img: require('../../assets/index_banner.png'),
//		  title: '送你一朵fua'
		  }]
		const urlList = baseList.map((item, index) => ({
//		  url: 'http://m.baidu.com',
		  img: item.img,
//		  title: `${item.title}`
		}))
	
	/*组件*/
	  export default {
		  	name: 'indexs',
			  components: {
			    Tabbar,
			    TabbarItem,
			    Grid,
			    GridItem,
			    Swiper,
			    XButton,
			    Checklist
			  },
			  data () {
			    return {
			      banner_list:urlList,
			      banner_index:0,
			      commonList:['理解并接受<<佰仟车险分期服务条款>>'],
			      isChange:true
			    }
			  },
			  //实例已经创建完成之后
		    created(){
	          this.$parent.init();
				},
			  methods:{
			  	banner_onIndexChange (index) {
			      this.banner_index = index
			    },
			    changes (val) {
			      this.isChange=!this.isChange
			    }
			  }
	  
	  }
</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>

		h1, h2 {font-weight: normal;}
		ul {list-style-type: none;padding: 0;}
		li {display: inline-block;margin: 0 10px;}
		a {color: #42b983;}
		
		@media screen and (min-width:300px) and (max-width: 320px) {
      .toubao_centen{background:#fff;position: absolute;z-index: 5;width:92%;top:15%;margin:0 4%;border-radius:5px;}
			.swiper_banner{margin-bottom: 100px;}
			.grid_list{margin-top:100px;background:#fff;}
		}
		/* 窗口宽度<480,设计宽度=320 */
		@media screen and (min-width:321px) and (max-width:375px){
		  .toubao_centen{background:#fff;position: absolute;z-index: 5;width:92%;top:20%;margin:0 4%;border-radius:5px;} 
			.swiper_banner{margin-bottom: 90px;}
			.grid_list{margin-top:90px;background:#fff;}
		}
		/* 窗口宽度<480,设计宽度=320 */
		@media screen and (min-width:376px) and (max-width:480px){
		  .toubao_centen{background:#fff;position: absolute;z-index: 5;width:92%;top:21%;margin:0 4%;border-radius:5px;} 
			.swiper_banner{margin-bottom: 80px;}
			.grid_list{margin-top:80px;background:#fff;}
		}
		/* 窗口宽度<640,设计宽度=480 */
		@media screen and (min-width:481px) and (max-width:640px){
		  .toubao_centen{background:#fff;position: absolute;z-index: 5;width:92%;top:20%;margin:0 4%;border-radius:5px;}    
			.swiper_banner{margin-bottom: 90px;}
			.grid_list{margin-top:90px;background:#fff;}
		}
		/* 窗口宽度<768,设计宽度=640 */
		@media screen and (min-width:641px) and (max-width:768px){
		  .toubao_centen{background:#fff;position: absolute;z-index: 5;width:92%;top:32%;margin:0 4%;border-radius:5px;}   
		  .swiper_banner{margin-bottom: 40px;}
		  .grid_list{margin-top:40px;background:#fff;}
		}
		/* 窗口宽度<960,设计宽度=768 */
		@media screen and (min-width:769px) and (max-width:960px){
		  .toubao_centen{background:#fff;position: absolute;z-index: 5;width:92%;top:30%;margin:0 4%;border-radius:5px;}  
			.swiper_banner{margin-bottom: 90px;}
			.grid_list{margin-top:90px;background:#fff;}
		}
		/* 窗口宽度<1024,设计宽度=768 */
		@media screen and (min-width:961px) and (max-width:1024px){
		  .toubao_centen{background:#fff;position: absolute;z-index: 5;width:92%;top:40%;margin:0 4%;border-radius:5px;}  
			.swiper_banner{margin-bottom: 30px;}
			.grid_list{margin-top:30px;background:#fff;}
		}

		.indexs{position:relative;}
		.grid-text {display: block;text-align: center;color: #a9b2b9;font-size:16px;margin:12px 0 0;}
		
		.buttonweui{width:80% !important; border-radius:99px;background:#2491ff;color:#fff;}
		.aa .weui-cells{font-size:12px}
		
		.grid_list{background:#fff;}
		
		.weui-cells:before{border:none !important;}
		.butts_go{padding: 15px 0 10px;}
		.lables{padding: 10px 10px 10px 25px;position: relative;font-size: 14px;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}
		.lables .lables_cell_hd{padding-right:5px;}
		.lables .lables_cell_hd .title_hui{color:#a9b2b9}
		.lables .lables_cell_hd .title_hui a{color:#535f66}
		.lables .lables_cell_bd{-webkit-box-flex: 1;-ms-flex: 1; flex: 1;}
		.lables .lables_cell_hd i{width:20px;height:20px;border:1px solid #ededed;border-radius:100%;display:inline-block;vertical-align: middle;font: normal normal normal 14px/1 "weui";font-size: inherit;
		    text-rendering: auto;-webkit-font-smoothing: antialiased;}
		
		.selected .lables_cell_icon{background: url(../../assets/icon_Checked@3x.png) no-repeat center center;background-size: contain;border: none;}
		.weui-btn_disabled.weui-btn_primary {background-color: #999999;border: none;}
		.weui-btn_plain-primary {border: none;}



</style>

<style>
		.indexs .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{background-size:100% 100%;}
		.indexs .grid-center .weui-grid__icon{width:50px !important;height:50px !important;margin:0 auto;}
		.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#0b9aff !important;}
</style>