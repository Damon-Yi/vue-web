<template>
  <div class="full-screen">
    <div class="d1 fbox scale55">
      <div>{{insurance.insuranceCompany.insuranceName}}</div>
      <div><span @click="goUrl">调整投保方案</span></div>
    </div>

    <div class="group">
      <div class="th fbox scale73 one_px_border_b">
        <div>保险期限</div>
        <div></div>
      </div>
      <div v-for="item of validDate" class="tr fbox scale73 one_px_border_b">
        <div>{{item.text}}</div>
        <div>{{item.thisDate}}</div>
      </div>
    </div>

    <div class="group">
      <div class="th fbox scale73 one_px_border_b">
        <div>交强险报价</div>
        <div>保费(元)</div>
      </div>
      <div v-for="item of forceInsurance" class="tr fbox scale73 one_px_border_b">
        <div>{{item.text}}</div>
        <div>￥{{item.thisPrise}}</div>
      </div>
      <div class="fbox cols">
        <div>交强险总计保费：<span class="red">￥{{forceInsuredTotal}}</span></div>
      </div>
    </div>

    <div class="group">
      <div class="th fbox scale73 one_px_border_b">
        <div>商业险报价(保额)</div>
        <div>保费(元)</div>
      </div>
      <div v-for="item of commercialInsuranceList" class="tr fbox scale73 one_px_border_b">
        <div>{{item.text+'('+item.thislimit+')万'}}</div>
        <div>￥{{item.thisPrise}}</div>
      </div>
      <!--<div class="tr fbox scale73 one_px_border_b">
        <div>商业第三者责任险(50万)</div>
        <div>￥500.00</div>
      </div>
      <div class="tr fbox scale73 one_px_border_b">
        <div>司机座位责任险(5万)</div>
        <div>￥500.00</div>
      </div>
      <div class="tr fbox scale73 one_px_border_b">
        <div>车身划痕损失险</div>
        <div>￥500.00</div>
      </div>
      <div class="tr fbox scale73 one_px_border_b">
        <div>全车盗抢险</div>
        <div>￥500.00</div>
      </div>
      <div class="tr fbox scale73 one_px_border_b">
        <div>不计免赔(车身划痕损失险)</div>
        <div>￥500.00</div>
      </div>
      <div class="tr fbox scale73 one_px_border_b">
        <div>不计免赔(商业第三者责任险)</div>
        <div>￥500.00</div>
      </div>-->
      <div class="fbox cols">
        <div>交强险总计保费：<span class="red">￥{{commercial}}</span></div>
      </div>
    </div>

    <div class="group">
      <div class="th fbox scaleblock one_px_border_b">
        <div>投保信息</div>
        <div></div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>投保城市</div>
        <div>{{originData.province+originData.city}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b act" @click="popCarInfo=true">
        <div>车辆信息</div>
        <div class="right-arrow">{{originData.brandModel}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>被保人</div>
        <div>{{originData.name}}</div>
      </div>
      <!--<div class="tr fbox scaleblock one_px_border_b">
        <div>投保人</div>
        <div>同被保人
          <icon type="success"></icon>
        </div>
      </div>-->
      <div class="tr fbox scaleblock one_px_border_b">
        <div>身份证号</div>
        <div>{{originData.cardNo}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b act" @click="pop=true">
        <div>配送信息</div>
        <div class="right-arrow">{{delivery.memberName+','+delivery.phoneNo+','+delivery.provinceCity+','+delivery.town+','+delivery.village+','+delivery.community+','+delivery.unit}}</div>
      </div>
    </div>
    <btn3 msg1="任性全款支付" msg2="立享6期免息分期特权" @btn111="btn111" @btn222="btn222"></btn3>


    <popup v-model="popCarInfo" height="75%" is-transparent>
      <div style="width: 95%;background-color:#fff;height:97%;margin:0 auto;border-radius:5px;padding:10px;overflow: scroll">
        <div class="group2">
          <div class="tr fbox scaleblock one_px_border_b">
            <div>开票日期</div>
            <div>{{originData.billedDate}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>厂牌型号</div>
            <div>{{originData.brandModel}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>发动机号码</div>
            <div>{{originData.engineNo}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>车辆识别代号/车架号</div>
            <div>{{originData.vin}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>是否过户车</div>
            <div v-if="originData.transfer==1">是</div>
            <div v-else>不是</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>过户日期</div>
            <div>{{new Date(originData.transferDate).Format("yyyy-MM-dd")}}</div>
          </div>
        </div>
        <btn msg="确认" @btnClickEvent="btnClickEvent"></btn>
      </div>
    </popup>

    <popup v-model="pop" height="90%" is-transparent>
      <div style="width: 95%;background-color:#fff;height:97%;margin:0 auto;border-radius:5px;padding:10px;overflow: scroll">
        <div class="group2">
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.memberName" type="text" placeholder="请填写收件人姓名">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.phoneNo" type="text" placeholder="请填写收件人联系电话">
          </div>
          <div class="tr fbox one_px_border_b right-arrow act">
            <input v-model="delivery.deliveryDate" type="text" placeholder="请选择递送日期">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.provinceCity" type="text" placeholder="请输入省/直辖市">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.town" type="text" placeholder="请输入镇/乡">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.village" type="text" placeholder="请输入街道/村">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.community" type="text" placeholder="请输入小区/楼盘">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.unit" type="text" placeholder="请输入栋/单元/房间号">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.emailAddress" type="text" placeholder="请输入邮箱地址">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.postcode" type="text" placeholder="邮政编码(选填)">
          </div>
          <div class="tr fbox one_px_border_b">
            <div>是否需要发票</div>
            <div class="tr-select">
              <div class="select right-arrow">
                <select v-model="delivery.needInvoice">
                  <option value="Y" selected>需要</option>
                  <option value="N">不需要</option>
                </select>
              </div>
              <div class="select right-arrow" v-show="isHide">
                <select v-model="delivery.invoiceType">
                  <option value="paper">电子发票</option>
                  <option value="electronic">纸质发票</option>
                </select>
              </div>
            </div>
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.invoiceTitle" type="text" placeholder="请填写发票抬头(个人或公司名称)">
          </div>
          <div class="tr fbox one_px_border_b">
            <input v-model="delivery.remark" type="text" placeholder="备注(选填)，最多200字">
          </div>
        </div>
        <btn msg="保存" @btnClickEvent="sendData"></btn>
      </div>
    </popup>

  </div>
</template>

<script>
  import axios from 'axios'
  import { Icon,Popup } from 'vux'
  import btn from '../widget/buttom-1'
  import btn3 from '../widget/buttom-3'
  export default {
    components: {
      Icon,
      Popup,
      'btn': btn,
      'btn3': btn3
    },
    data(){
      return {
        pop: false,
        popCarInfo: false,
        insuranceCode: this.$route.query.insuranceCode,
        insurance: {
          insuranceCompany:{
            insuranceName:''
          }
        },//data
        validDate: [],//有效期
        forceInsurance: [],//交强险
        commercialInsuranceList: [],//商业险

        //全款和分期按钮
        btn111Data: {},
        btn222Data: {},
        originData: {
          /*vehicleInfo: {
           province: '',
           city: ''
           },
           member: {
           cardNo: ''
           }*/
        },//投保信息
        delivery: {}//配送信息
      }
    },
    computed: {
      forceInsuredTotal(){
        var total = 0;
        for (var a in this.forceInsurance) {
          total += this.forceInsurance[a].thisPrise
        }
        return total;
      },
      commercial(){
        var commercialTotal = 0;
        for (var n in this.commercialInsuranceList) {
          commercialTotal += this.commercialInsuranceList[n].thisPrise
        }
        return commercialTotal;
      },
      waywardPayData(){
        /*var a={};
         a.insurCompanyId=insuranceCode;
         return a;*/
      },
      stagesPay(){
      },
      isHide(){
        return this.delivery.needInvoice=='Y'?true:false;
      }
    },
    methods: {
      goUrl(){
        this.$router.push({path:'/companySelect',query: {}})
      },
      btnClickEvent: function () {
        this.popCarInfo = false
      },
      btn111: function () {
        this.btn111Data.insurCompanyId = this.insurance.insuranceCompany.id;
        this.btn111Data.insurAddress = this.originData.province+this.originData.city;
        this.btn111Data.insurancePolicyId = this.delivery.id;
        this.btn111Data.quotationInfo =JSON.stringify(this.insurance.commercialInsuranceList);
        this.btn111Data.compulInsurDate = new Date(this.insurance.forceEffectiveDate).Format("yyyy-MM-dd");
        this.btn111Data.businessInsurDate = new Date(this.insurance.commercialEffectiveDate).Format("yyyy-MM-dd");
        this.btn111Data.compulInsurAmount = this.insurance.forceInsurance.preimumAmount;
        this.btn111Data.vehicleVesselAmount = this.insurance.vehicleVesselTaxFee;
        this.btn111Data.businessInsurAmount = this.commercial;
        this.btn111Data.installment = 0;
        this.btn111Data.vehicleId = this.originData.vehicleId;

        console.log(JSON.stringify(this.btn111Data))
        this.$http.post(this.$root.url+"order/createOrder", JSON.stringify(this.btn111Data), {
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxODU3NTU2MDQ2MiIsImlhdCI6MTQ5ODAzMjE2MSwic3ViIjoibG9naW5fdG9rZW4iLCJhdWQiOiJ7XCJpZENhcmRcIjpcIjQ1MDEyMTE5OTAwNTI1NjAzMlwiLFwicGhvbmVcIjpcIjE4NTc1NTYwNDYyXCJ9IiwiZXhwIjoxNDk4NjM2OTYxfQ.qjIgIw2XoHFPuAOZtDSZgqH5fm-tu4l_EPqB0jtxwDM'
          },
        }).then(function(res) {
          console.log(11)
//          location.href='http://www.baidu.com'
//          this.$router.push({path:'/installmentSuccess',query: {cvvInsur:0}})
        }, function(error) {
          console.log(22)
        });
      },
      btn222(){
        this.btn222Data.insurCompanyId = this.insurance.insuranceCompany.id;
        this.btn222Data.insurAddress = this.originData.province+this.originData.city;
        this.btn222Data.insurancePolicyId = this.delivery.id;
        this.btn222Data.quotationInfo =JSON.stringify(this.insurance.commercialInsuranceList);
        this.btn222Data.compulInsurDate = new Date(this.insurance.forceEffectiveDate).Format("yyyy-MM-dd");
        this.btn222Data.businessInsurDate = new Date(this.insurance.commercialEffectiveDate).Format("yyyy-MM-dd");
        this.btn222Data.compulInsurAmount = this.insurance.forceInsurance.preimumAmount;
        this.btn222Data.vehicleVesselAmount = this.insurance.vehicleVesselTaxFee;
        this.btn222Data.businessInsurAmount = this.commercial;
        this.btn222Data.installment = 1;
        this.btn222Data.vehicleId = this.originData.vehicleId;

        console.log(JSON.stringify(this.btn222Data))
        this.$http.post(this.$root.url+"order/createOrder", JSON.stringify(this.btn222Data), {
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxODU3NTU2MDQ2MiIsImlhdCI6MTQ5ODAzMjE2MSwic3ViIjoibG9naW5fdG9rZW4iLCJhdWQiOiJ7XCJpZENhcmRcIjpcIjQ1MDEyMTE5OTAwNTI1NjAzMlwiLFwicGhvbmVcIjpcIjE4NTc1NTYwNDYyXCJ9IiwiZXhwIjoxNDk4NjM2OTYxfQ.qjIgIw2XoHFPuAOZtDSZgqH5fm-tu4l_EPqB0jtxwDM'
          },
        }).then(function(res) {
          console.log(11)
          if(res.data.ask==0){
            this.$router.push({path:'/installmentInfo',query: {'orderId':res.data.data.orderId}})
          }


        }, function(error) {
          console.log(22)
        });
      },
      sendData(){
        this.$http.post(
          this.$root.url + "delivery/save", this.delivery,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'token': 'abcdd'
            }
          }
        ).then(function (data) {
          console.log(1)
          this.pop = false

        }, function (error) {
          console.log(2)
        });
      },
      _getThisPrise(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "quotation/queryByCompany",
          params: {selectedInsuranceCode: this.insuranceCode},
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.insurance = res.data.data;
            if (this.insurance.forceInsured == 'true') {
              //二者保险期限
              this.validDate.push({
                thisDate: new Date(this.insurance.forceEffectiveDate).Format("yyyy-MM-dd"),
                text: '交强险保障生效期'
              })

              //交强险报价
              this.forceInsurance.push({
                thisPrise: this.insurance.forceInsurance.preimumAmount,
                text: '交强险'
              })
              this.forceInsurance.push({
                thisPrise: this.insurance.vehicleVesselTaxFee,
                text: '车船税代缴'
              })
            }

            if (this.insurance.commercialInsured == 'true') {
              this.validDate.push({
                thisDate: new Date(this.insurance.commercialEffectiveDate).Format("yyyy-MM-dd"),
                text: '商业险保障生效期'
              })

              //商业险报价
              for (var n in this.insurance.commercialInsuranceList) {
                this.commercialInsuranceList.push({
                  thislimit: this.insurance.commercialInsuranceList[n].limitAmount,
                  thisPrise: this.insurance.commercialInsuranceList[n].preimumAmount,
                  text: this.insurance.commercialInsuranceList[n].code,
                })
              }

            }
          }

        }, function (error) {
          console.log(2)
        })


      },
      _carInfo(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "vehicle/getInfos",
          params: {},
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.originData = res.data.data;
          }

        }, function (error) {
          console.log(2)
        })

      },
      _deliveryInfo(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "delivery/getInsurancePolicy",
          params: {
            insurancePolicyId: '1'
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.delivery = res.data.data;
            delete this.delivery.compositeAddress
          }

        }, function (error) {
          console.log(2)
        })

      },

    },
    created: function () {
      this.$parent.init();
      //报价
      //投保信息
      //配送信息
      this._getThisPrise()
      this._carInfo()
      this._deliveryInfo()


    }
  }
</script>

<style scoped>
  /*.full-screen{background-color:#eef2f9 ;}*/

  .fbox {
    display: flex;
    font-size: 15px;
    align-items: center;
    -webkit-align-items: center;
  }

  .d1 {
    background: #fff;
    padding: 15px;
  }

  .d1 > div {
    width: 50%
  }

  .d1 > div:first-child {
    font-size: 16px;
    color: #434f5d;
    font-weight: bold;
  }

  .d1 > div:last-child {
    font-size: 14px;
    text-align: right
  }

  .d1 > div:last-child > span {
    border-radius: 3px;
    border: 1px solid #0b92f1;
    background: #fff;
    padding: 4px;
    color: #0b92f1;
  }

  .group {
    margin: 10px 10px 0 10px;
    padding: 10px;
    background: #fff;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
  }

  .th {
    font-size: 18px;
    color: #0b92f1;
  }

  .th > div:first-child {
    position: relative;
    text-indent: 1em;
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

  .scale55 > *:first-child, .scale55 > *:last-child {
    width: 50%;
  }

  .scale73 > *:first-child {
    width: 70%;
  }

  .scale73 > *:last-child {
    width: 30%;
  }

  .scaleblock > *:last-child {
    flex: 1
  }

  .weui-icon-success {
    color: #2491ff
  }

  .group2 {
  }

  .group2 .tr {
    height: 44px;
  }

  .group2 input {
    border: none;
    font-size: 15px;
    color: #434f5d;
    outline: 0;
    width: 100%;
    height: 1.41176471em;
    background: none;
    line-height: 1.41176471;
  }

  select {
    border: none;
    font-size: 14px;
    color: #434f5d;
  }

  .tr-select{flex:1;text-align: right;}
</style>
