<template>
  <div>
    <div class="d3">
      <div class="tr one_px_border_b">
        <div>被保人</div>
        <div>{{mainData.vehicleName}}</div>
      </div>
      <!--<div class="tr one_px_border_b">
        <div>投保人</div>
        <div>同被保人<icon type="success"></icon></div>
      </div>-->
      <!--<div class="tr one_px_border_b">
        <div>车主姓名</div>
        <div>{{mainData.vehicleName}}</div>
      </div>-->
      <div class="tr one_px_border_b">
        <div>车主身份证号码</div>
        <div>{{mainData.idCard}}</div>
      </div>
      <div class="tr one_px_border_b">
        <div>银行卡号</div>
        <div>{{mainData.bankAccount}}</div>
      </div>
      <div class="tr one_px_border_b">
        <div>手机号</div>
        <div>{{mainData.phoneNo}}</div>
      </div>
      <div class="tr one_px_border_b">
        <div>挑战码</div>
        <div><input type="text" v-model="challenge" class="receive" placeholder="请输入挑战码"><span class="btn-receive" @click="getChallengeCode">接收挑战码</span></div>
      </div>
      <div class="contract">
        <div class="bi" @click="isAgree"><icon v-show="iconType" type="circle"></icon><icon v-show="!iconType" type="success"></icon><span>签订电子合同</span></div>
        <div>(*需签订合同后才可享受商业险分期特权)</div>
      </div>
      <btn2 msg1="上一步" msg2="确定分期" @btn11="btn11" @btn22="btn22"></btn2>
    </div>
  </div>
  <!--{ iconType ? 'success': 'circle'}-->
</template>

<script>
  import Btn2 from '../widget/buttom-2'
  import { Icon } from 'vux'
  export default {
    props: {

    },
    components: {
      Icon,
      'btn2': Btn2
    },
    data () {
      return {
        iconType:false,
        mainData:{},
        checkData:{},
        orderId:this.$route.query.orderId,
        challenge:'',//挑战码
        cvvInsur:''//是否支付商业险：1支付，0没有支付
      }
    },
    methods: {
      btn11:function(){
        this.$router.push({path:'/installmentInfo',query: {}})
      },
      btn22:function(){
        this.checkData.phoneNum=this.mainData.phoneNo;
        this.checkData.contractNo=this.mainData.contractNo;
        this.checkData.contractType='20';
        this.checkData.isSeal=0;
        this.checkData.challengeCode=this.challenge;
        this.$http({
          method: 'GET',
          url: this.$root.url + "ca/checkChallengeCode",
          params: this.checkData,
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(function (res) {
          if(res.data.ask==0){
            this.$router.push({path:'/tipPage',query: {tip:this.mainData.cvvInsur}})
          }

        }, function (error) {
          console.log(2)
        })

      },
      isAgree(){
        this.iconType=!this.iconType;
      },
      getChallengeCode(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "ca/getChallengeCode",
          params: {
            'certId':this.mainData.idCard,
            'phoneNum':this.mainData.phoneNo,
            'customerName':this.mainData.vehicleName,
            'contract':this.mainData.contractNo,
            'contractType':'01'
          },
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(function (res) {
          if(res.data.ask==0){


            this.checkData.transId=res.data.data.transID;
          }

        }, function (error) {
          console.log(2)
        })
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/basicContractInfo",
          params: {'orderId':this.orderId},
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(function (res) {
          if(res.data.ask==0){
            this.mainData=res.data.data;
            this.cvvInsur=res.data.data.cvvInsur
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

<style scoped>
  .d3{padding:10px;background: #fff;}
  .tr{display: flex;font-size:16px;}
  .tr>*{padding:10px 0;}
  .tr>*:first-child{text-align: left;color:#8ca3b5;}
  .tr>*:last-child{flex:1;text-align: right;color:#434f5d;}


  input{outline: 0;border: 0;text-align: right;font-size:16px;}
  select{font-size:16px;}

  .receive{width:50%;text-align: left}
  .btn-receive{border-radius: 3px;border: 1px solid #0b92f1;background: #fff;padding: 4px;color: #0b92f1;margin-left:5px;font-size:14px;}

  .weui-icon-success{color:#2491ff}

  .contract{margin:20px 10px 10px;text-align: center}
  .contract>div:first-child{font-size:16px;color:#434f5d;}
  .contract>div:first-child+div{font-size:14px;color:red;}

  .bi{letter-spacing: -0.315em}
  .bi>*{letter-spacing: normal;display: inline-block;vertical-align: middle;}
</style>
