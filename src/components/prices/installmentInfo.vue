<template>
  <div class="full-screen">
    <div class="group">
      <div class="tr fbox scaleblock one_px_border_b">
        <div>服务类型</div>
        <div>{{mainData.serviceType}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>保险公司</div>
        <div>{{mainData.insuranceCompanyName}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>商业险保障生效期</div>
        <div>{{time00}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>被保人</div>
        <div>{{mainData.insurancePersonName}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>贷款金额</div>
        <div class="red">￥{{mainData.loadAmount}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>期数</div>
        <div class="red">{{mainData.numberPeriod}}期</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>每月还款</div>
        <div class="red"><span class="small-box" @click="popShow">试算</span></div>
      </div>
      <!--<div class="tr fbox scaleblock one_px_border_b" style="margin-bottom:30px;">
        <div>本期应付</div>
        <div>交强险+车船税代缴 <span class="red">￥10000.00</span></div>
      </div>-->
      <btn msg="确定" @btnClickEvent="btnClickEvent"></btn>
    </div>

    <popup v-model="pop" height="90%" is-transparent>
      <div style="width: 95%;background-color:#fff;height:97%;margin:0 auto;border-radius:5px;padding:10px;overflow: scroll">
        <div class="group2">
          <div class="fbox one_px_border_b">
            <div>应还本金</div>
            <div>应还利息</div>
            <div>应还手续费</div>
          </div>
          <div v-for="item of listDetail.schedules" class="fbox one_px_border_b">
            <div>{{item.loan_term_prin}}元</div>
            <div>{{item.loan_term_int}}元</div>
            <div>{{item.loan_term_install_fee}}元</div>
          </div>
          <br>
          <div class="fbox one_px_border_b">
            <div>期数</div>
            <div>还款日期</div>
          </div>
          <div class="fbox one_px_border_b">
            <div>{{listDetail.loan_term}}</div>
            <div>{{time0}}</div>
          </div>

        </div>
        <btn msg="确定" @btnClickEvent="colsePop"></btn>
      </div>
    </popup>
  </div>
</template>

<script>
  import Btn from '../widget/buttom-1'
  import {Popup } from 'vux'
  export default {
    name: 'installmentInfo',
    props: {

    },
    components: {
      Popup,
      'btn': Btn
    },
    data () {
      return {
        pop: false,
        orderId:this.$route.query.orderId,
        mainData:{},
        listDetail:{},
        time0:''
      }
    },
    computed:{
      time00(){
        return new Date(this.mainData.commercialEffectiveDate).Format("yyyy-MM-dd")
      }
    },
    methods:{
      popShow(){
        this.pop=true;
        this.$http({
          method: 'post',
          url: this.$root.url + "loadTrail/listDetail",
          params: {'loadAmount':this.mainData.loadAmount,'loadNumbers':this.mainData.numberPeriod},
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(function (res) {
          if(res.data.ask==0){
            this.listDetail=res.data.data;
            this.time0=this.listDetail.schedules[0].loan_pmt_due_date
          }

        }, function (error) {
          console.log(2)
        })
      },
      colsePop(){
        this.pop=false
      },
      btnClickEvent:function(){
        this.$router.push({path:'/signContract',query: {orderId:this.orderId}})
      },
      _init(){

        this.$http({
          method: 'GET',
          url: this.$root.url + "order/getInsuranceStages",
          params: {'orderId':this.orderId},
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(function (res) {
          if(res.data.ask==0){
            this.mainData=res.data.data;
          }

        }, function (error) {
          console.log(2)
        })




      }
    },
    created:function(){
      this.$parent.init();
      this._init()


    }
  }


</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>

  .fbox{display: flex;font-size:16px;align-items: center;-webkit-align-items: center;}
  .full-screen{background-color:#eef2f9 ;height:100%;}
  .group{margin:10px 10px;padding:10px;background: #fff;}
  .th>div:first-child,.tr>div:first-child{text-align: left;padding:10px 0;color:#7990a2;}
  .th>div:last-child,.tr>div:last-child{flex:1;text-align: right;color:#434f5d;}
  .th>div:last-child,.tr>div:last-child.red{color:red;}

  .small-box{border:1px solid #999;margin-left:10px;padding:2px 5px;font-size:13px;color:#999;border-radius: 3px;}
  .small-box:active{border-color:#000;color:#000;}

  .group2{}
  .group2>.fbox>div{flex:1;padding:5px;text-align: center}

</style>
