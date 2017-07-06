<template>
  <div>
    <div class="div0">
      <template v-if="mainData.orderResult.orderStatus==0">
        <div class="div1">
          <img class="full-size" src="../../assets/order_icon4.png">
        </div>
        <div class="div2">
          <div class="txt red">待支付</div>
          <div class="txt" style="font-size:12px;">
            (商业险：
            <span v-if="mainData.orderResult.compulInsurStatus==0" class="red" style="font-size:12px;">未支付</span>
            <span v-if="mainData.orderResult.compulInsurStatus==1">已支付</span>
          )</div>
          <div class="txt" style="font-size:12px;">
            (交强险：
            <span v-if="mainData.orderResult.installmentStatus==0" class="red" style="font-size:12px;">未支付</span>
            )<span v-if="mainData.orderResult.installmentStatus==1">已支付</span>
          </div>
          <div class="txt">请在2017/5/11 23:00之前支付超时订单将会自动取消</div>
        </div>
      </template>

    </div>
    <div>
      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>保险期限</div>
          <div></div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>交强险保障生效期</div>
          <div>{{mainData.insuranceSummary.compulInsurDate}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>商业险保障生效期</div>
          <div>{{mainData.insuranceSummary.compulInsurDate}}</div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>交强险报价</div>
          <div>保费(元)</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>交强险</div>
          <div>￥{{mainData.insuranceSummary.compulInsurAmount}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车船税代缴</div>
          <div>￥{{mainData.insuranceSummary.vehicleVesselAmount}}</div>
        </div>
        <div class="fbox cols">
          <div>交强险总计保费：<span class="red">￥{{mainData.insuranceSummary.compulInsurAmount+mainData.insuranceSummary.vehicleVesselAmount}}</span></div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>商业险报价(保额)</div>
          <div>保费(元)</div>
        </div>
        <div v-for="item of mainData.insuranceSummary.insuranceArray" class="tr fbox scaleblock one_px_border_b">
          <div>{{item.code+'('+item.limitAmount+')万'}}</div>
          <div>￥{{item.preimumAmount}}</div>
        </div>
        <!--<div class="tr fbox scaleblock one_px_border_b">
          <div>车辆损失险(20万)</div>
          <div>￥1000.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>商业第三者责任险(50万)</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>司机座位责任险(5万)</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车身划痕损失险</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>全车盗抢险</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>不计免赔(车身划痕损失险)</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>不计免赔(商业第三者责任险)</div>
          <div>￥500.00</div>
        </div>-->
        <div class="fbox cols">
          <div>交强险总计保费：<span class="red">￥{{mainData.insuranceSummary.compulInsurAmount}}</span></div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>投保信息</div>
          <div></div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保公司</div>
          <div>{{mainData.insuranceCompany.insuranceName}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保城市</div>
          <div>{{mainData.insurAddress}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车辆信息</div>
          <div>{{mainData.vehicleInfo.brandModel}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>被保人</div>
          <div>同车主
            <icon type="success"></icon>
          </div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保人</div>
          <div>同被保人
            <icon type="success"></icon>
          </div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车主身份证号码</div>
          <div>{{mainData.vehicleOnwerCardNo}}</div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>收件人信息</div>
          <div></div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>收件人</div>
          <div>{{mainData.insurancePolicy.memberName+','+mainData.insurancePolicy.phoneNo+','+mainData.insurancePolicy.provinceCity+','+mainData.insurancePolicy.town+','+mainData.insurancePolicy.village+','+mainData.insurancePolicy.community+','+mainData.insurancePolicy.unit}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>递送日期</div>
          <div>{{mainData.insurancePolicy.deliveryDate}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>是否需要发票</div>
          <div>
            <template v-if="mainData.insurancePolicy.needInvoice=='Y'">需要</template>
            <template v-if="mainData.insurancePolicy.needInvoice=='N'">不需要</template>
            <template v-if="mainData.insurancePolicy.needInvoice=='N'">
              <template v-if="mainData.insurancePolicy.invoiceType=='paper'">纸质发票</template>
              <template v-if="mainData.insurancePolicy.invoiceType=='electronic'">电子发票</template>
            </template>
          </div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>发票抬头</div>
          <div>{{mainData.insurancePolicy.invoiceTitle}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>订单编号</div>
          <div>{{mainData.insuranceSummary.quotationNo}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保时间</div>
          <div>{{mainData.orderResult.acceptInsurTime}}</div>
        </div>

        <template v-if="mainData.orderResult.orderStatus==1">
          <div class="tr fbox scaleblock one_px_border_b">
            <div>付款时间</div>
            <div>{{mainData.orderResult.acceptInsurTime}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>退保时间</div>
            <div>{{mainData.orderResult.surrenderInsurTime}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>贷款合同号</div>
            <div>{{mainData.orderResult.contractNo}}</div>
          </div>
        </template>

        <template v-if="mainData.orderResult.orderStatus==10">
          <div class="tr fbox scaleblock one_px_border_b">
            <div>取消时间</div>
            <div>{{mainData.orderResult.orderCancelTime}}</div>
          </div>
        </template>

        <template v-if="mainData.orderResult.orderStatus==15">
          <div class="tr fbox scaleblock one_px_border_b">
            <div>完成时间</div>
            <div>{{mainData.orderResult.acceptInsurTime}}</div>
          </div>
        </template>

        <div class="tr fbox scaleblock one_px_border_b">
          <div>备注</div>
          <div>{{mainData.insurancePolicy.remark}}</div>
        </div>
        <div class="fbox cols">
          <div class="tip1">注意：商业险分期保单寄送到佰仟，用户可查看电子保单照片。</div>
        </div>
      </div>
      <template v-if="mainData.orderResult.orderStatus==0">
        <btn3 msg1="取消投保" msg2="继续投保" @btn111="btn111" @btn222="btn222"></btn3>
      </template>

    </div>
  </div>
</template>


<script>
  import { Icon} from 'vux'
  import btn3 from '../widget/buttom-3'
  export default {
    components: {
      Icon,
      'btn3': btn3
    },
    data () {
      return {
        step1: 1,
        step2: 0,
        orderId:this.$route.query.orderId,
        mainData:{
          insuranceSummary:{
            compulInsurDate:'',
            businessInsurDate:'',
            quotationInfo:''
          },
          insuranceCompany:{
            insuranceName:''
          },
          insurancePolicy:{
            memberName:''
          },
          vehicleInfo:{
            brandModel:''
          },
          orderResult:{
            acceptInsurTime:''
          }
        }
      }
    },
    computed:{

    },
    methods: {
      btn111:function(){
//        alert(11)
      },
      btn222:function(){
        this.$router.push({path:'/installmentInfo',query: {orderId:this.orderId}})
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/getOrderInfoAll",
          params: {orderId:this.orderId},
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxODU3NTU2MDQ2MiIsImlhdCI6MTQ5ODAzMjE2MSwic3ViIjoibG9naW5fdG9rZW4iLCJhdWQiOiJ7XCJpZENhcmRcIjpcIjQ1MDEyMTE5OTAwNTI1NjAzMlwiLFwicGhvbmVcIjpcIjE4NTc1NTYwNDYyXCJ9IiwiZXhwIjoxNDk4NjM2OTYxfQ.qjIgIw2XoHFPuAOZtDSZgqH5fm-tu4l_EPqB0jtxwDM'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.mainData=res.data.data;
            this.mainData.insuranceSummary.compulInsurDate=new Date(this.mainData.insuranceSummary.compulInsurDate).Format("yyyy-MM-dd");//交强险保障生效期
            this.mainData.insuranceSummary.compulInsurDate=new Date(this.mainData.insuranceSummary.compulInsurDate).Format("yyyy-MM-dd");//商业险保障生效期
            this.mainData.insurancePolicy.deliveryDate=new Date(this.mainData.insurancePolicy.deliveryDate).Format("yyyy-MM-dd");//递送日期
            this.mainData.orderResult.acceptInsurTime=new Date(this.mainData.orderResult.acceptInsurTime).Format("yyyy-MM-dd");//投保日期

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
  .div0{background: #fff;}
  .div1{width:70%;margin:0 auto;padding:30px 0 20px;}
  .div2{width:100%;margin:0 auto 10px;padding-bottom: 20px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;padding:0 15px}
  .red{font-size:17px;}

  .fbox {
    display: flex;
    font-size: 15px;
    align-items: center;
    -webkit-align-items: center;
  }
  .fbox.scaleblock>div:last-child{
    flex: 1;
  }
  .group {
    margin: 10px 10px 0 10px;
    padding: 0 10px 10px 10px;
    background: #fff;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
  }
  .group:last-child{margin-bottom: 15px;}
  .th {
    font-size: 18px;

  }

  .th > div:first-child {
    position: relative;
    text-indent: 1em;
    color: #0b92f1!important;
  }
  .th > div:first-child:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 15px;
    width: .2em;
    height: 1em;
    background: #0b92f1;
  }
  .th > div:last-child {
    color: #0b92f1!important;
  }
  .th > div:first-child, .tr > div:first-child {
    text-align: left;
    padding: 10px 0;
    color: #7990a2;
  }

  .th > div:last-child, .tr > div:last-child {
    text-align: right;
    color: #434f5d;
  }
  .cols > div {
    width: 100%;
    text-align: right;
    padding: 10px 0;
    color: #7990a2;
  }
  .tip1{font-size:13px;text-align: left!important;color:red!important;}
  .weui-icon-success {
    color: #2491ff
  }
</style>
