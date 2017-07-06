<template>
    <div class="billist">
        <div class="bill_title">
           <h3>{{mainData.contract_count}}</h3>
           <p>我办理过的分期(笔)</p>
        </div>
        <div class="billist_centen">
        	<div v-for="item of mainData.contract_list" class="billist_item">
	        	<router-link :to="{path:path,query: {orderId:item.contract_no}}">
	        		<div class="billist_tl one_px_border_b right-arrow">合同号：{{item.contract_no}}</div>
	        		<div class="billist_bd one_px_border_b">
	        			<div class="text_left">贷款本金：{{item.loan_amt}}元</div>
	        			<div class="text_right">还款日期：每月{{item.repay_date}}号</div>
	        		</div>
	        		<div class="billist_bp">
	        			<div class="text_left">还款状态：{{item.status_desc}}</div>
                <div class="text_right">还款期数：{{item.term}}期</div>
	        		</div>
	        	</router-link>
        	</div>
        </div>
    </div>

</template>

<script>
	import { XButton} from 'vux'
    export default {
	  	//name: 'cardModfy',
	    props: {
	    },
	    components: {
	    	XButton
	    },
	    data () {
	      return {
          mainData:'',
          listContract:this.$route.query.listContract
	      }
	    },
      computed:{
        path(){
          if(this.listContract=='M101'){
            return '/prepayment'
          }else{
            return '/repaymentBill'
          }
        }
      },
	    //实例已经创建完成之后
	    created(){
			  this.$parent.init();
        this._init();
		  },
      methods:{
        _init(){
          this.$http({
            method: 'GET',
            url: this.$root.url + "loadTrail/listContract",
            params: {listContract:this.listContract},
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (res) {
            if(res.data.ask==0){
            this.mainData=res.data.data
            }

          }, function (error) {
            console.log(2)
          })
        }
      },
	}
</script>

<style scoped>
	.bill_title{height:120px;width:100%;text-align:center;color:#fff;background:url(../../assets/bill_bg.png) no-repeat center center;background-size:cover}
    .bill_title h3{text-align: center;padding-top:20px;font-size:36px;line-height: 1.3;}
    .bill_title p{text-align: center;font-size:14px;}

    .billist_item{margin-top:15px;padding:0 10px;background:#fff;}
    .billist_item .billist_tl{padding:10px 0px 10px 30px;font-size:13px;color:#1b1b1b;background:url(../../assets/chexian_icon.png) no-repeat left center;background-size:25px 25px;}
    .billist_item .billist_bd,.billist_item .billist_bp{padding:10px 0;color:#a5a5a5;position:relative;display: -webkit-box;display: -ms-flexbox;display: flex;font-size: 15px;}
    .billist_item .billist_bd .text_left{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: left;color: #a5a5a5;}
    .billist_item .billist_bp .text_right{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: right;color: #a5a5a5;}


</style>
