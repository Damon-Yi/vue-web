<template>
	<div class="search">
		<div class="search_top">
		    <div class="search_frame">
		   		<div class="search_frame_center">
		   			<input type="text" placeholder="例：荣威55020121.8L风尚版" @input="inputchange" v-model="value"/>
		   			<span class="search_but"></span>
		   		</div>
		    </div>
		    <div class="search_title">
		   	 <span>您的候选车款</span>
		    </div>
		    <div class="hint_title">请正确选择您自己的车型，否则影响报价</div>
	    </div>
	    <div class="details">
		    <div class="no_listdata" v-if="results==''||results==undefined">
		    	<div class="no_list_icon">
		    		<img src="../../assets/no_data.png" />
		    	</div>
		    	<p>没有搜索到结果</p>
		    </div>
		    <div class="details_lists" v-else>
		    	<div class="search_lists" v-for="i in results">
			   	  <p class="lists_title">东风宝马</p>
			   	  <div class="lists_centers">东风宝马东风宝马东风宝马东风宝马</div>
			    </div>
		    </div>
		    
	    </div>
	</div>
</template>

<script>
	import { Search} from 'vux'
	export default{
		name: 'search',
    	components: {
		    Search
		},
		data () {
		    return {
		    	results: [],
		    	value:''
		    	
		    }
	    },
	    //实例已经创建完成之后
	    created(){
          this.$parent.init();
		},
	    //方法对象
	    methods:{
		    getResult (val) {
		      this.results = val ? getResult(this.value) : []
		    },
		    inputchange(){
		    	console.log( this.results)
		    	this.$http.post(this.$root.url+"basedata/queryModels", {
		    		"keywords":this.value	
	    		}, {
			        headers: {},
			        emulateJSON: true
			    }).then(function(data) {// 这里是处理正确的回调
			    	console.log(data)
			        var datas=data.body.data;
	            	this.results=datas.data;
			        console.log( this.results)
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			    });
		    }
		  	
		},
		
		//计算属性
		computed:{
        
        }
	    
	}
	function getResult (val) {
		  let rs = []
		  for (let i = 0; i < 8; i++) {
		    rs.push({
		      title: `${val} result: ${i + 1} `,
		      other: i
		    })
		  }
		  return rs
		}
	
</script>

<style scoped>
	input,textarea{-webkit-appearance: none;outline: none;}
	.search_top{position:fixed;z-index: 9999;width:100%;margin:0 auto;top:0;left: 0;right:0;}
	.search_top .search_frame{padding:10px;background:#fff;}
    .search_top .search_frame .search_frame_center{width:100%;position:relative;background:#EEF2F9;border-radius:3px;}
    .search_top .search_frame .search_frame_center input{width:85%;height:38px;line-height:38px;border:none;background:#EEF2F9;text-indent:10px;border-radius:3px;}
    .search_top .search_frame .search_frame_center .search_but{width:12%;height:38px;line-height:38px;display:inline-block;position: absolute;right:0;top:0;bottom:0;
    text-align: center;background: url(../../assets/search.png) no-repeat center center;background-size:21px 21px;border-radius:3px;}
    .search_top .hint_title{width:100%;background:#fff;text-align:center;font-size:16px;color:#FF0000;padding:15px 0 20px;}
    
    .search_title{padding:10px 15px;color:#535F66;font-size:16px;background:#eef2f9;}
    .details{min-height:100%;height:100%;width:100%;background:#fff; padding-top:163px;}
    
    .no_listdata{text-align: center;margin:0 auto;padding:20px;}
    .no_listdata .no_list_icon{padding:20px 15px;width:70%;height:auto;margin:0 auto;}
    .no_listdata .no_list_icon img{width:100%}
    
    .search_lists{width:90.625%;margin:0 4.6875%;padding:10px 0;border-bottom:1px solid #eef0f1;}
    .search_lists .lists_title{color:#2491ff;font-size:18px;}
    
</style>