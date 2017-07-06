<template>
  <div class="full-screen">

    <div v-for="item of mainData">
      <div v-if="item.businessInsur==1&&item.cvvInsur==0" class="group">
        <template v-if="item.orderStatus==0">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>未完成</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has business">商业保单</div>
            <div class="red">￥{{item.orderAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>商业险保单有效期</div>
            <div>{{new Date(item.businessInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.businessInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>下单时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="cancelInsurance(item.orderId,item.businessInsur,item.cvvInsur,0)">取消投保</a>
              <a class="btn" @click="continueInsurance(item.orderId)">继续投保</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
        <template v-if="item.orderStatus==1">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已完成</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has business">商业保单</div>
            <div class="red">￥{{item.orderAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>商业险保单有效期</div>
            <div>{{new Date(item.businessInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.businessInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>

          <div class="tr fbox scaleblock one_px_border_b">
            <div>付款时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>

          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="installmentContract(item.orderId)">分期合同</a>
              <a class="btn" @click="repaymentBill(item.orderId)">还款账单</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
        <template v-if="item.orderStatus==10">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已退保</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has business">商业保单</div>
            <div class="red">￥{{item.orderAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>商业险保单有效期</div>
            <div>{{new Date(item.businessInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.businessInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>退保时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="installmentContract(item.orderId)">分期合同</a>
              <a class="btn" @click="repaymentBill(item.orderId)">还款账单</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
        <template v-if="item.orderStatus==15">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已取消</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has business">商业保单</div>
            <div class="red">￥{{item.orderAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>商业险保单有效期</div>
            <div>{{new Date(item.businessInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.businessInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>取消时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="deleteOrder(item.orderId)">删除</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
      </div>

      <div v-if="item.businessInsur==0&&item.cvvInsur==1" class="group">
        <template v-if="item.orderStatus==0">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>未完成</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has force">交强险保单</div>
            <div class="red">￥{{item.compulInsurAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>交强险保单有效期</div>
            <div>{{new Date(item.compulInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.compulInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>下单时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>

          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="cancelInsurance(item.orderId,item.businessInsur,item.cvvInsur,0)">取消投保</a>
              <a class="btn" @click="continueInsurance(item.orderId)">继续投保</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
        <template v-if="item.orderStatus==1">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已完成</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has force">交强险保单</div>
            <div class="red">￥{{item.compulInsurAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>交强险保单有效期</div>
            <div>{{new Date(item.compulInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.compulInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>付款时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
        <template v-if="item.orderStatus==10">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已退保</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has force">交强险保单</div>
            <div class="red">￥{{item.compulInsurAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>交强险保单有效期</div>
            <div>{{new Date(item.compulInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.compulInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>退保时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
        <template v-if="item.orderStatus==15">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已取消</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has force">交强险保单</div>
            <div class="red">￥{{item.compulInsurAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>交强险保单有效期</div>
            <div>{{new Date(item.compulInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.compulInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>取消时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="deleteOrder(item.orderId)">删除</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
      </div>

      <div v-if="item.orderInsuranceList.length==2" class="group">
        <template v-if="item.orderStatus==0">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>未完成</div>
          </div>

          <template v-for="type of item.orderInsuranceList">
            <template v-if="type.compositeType=='vci'">
              <div class="th fbox scaleblock one_px_border_b">
                <div class="icon-has business">商业保单</div>
                <div class="red">￥{{item.orderAmount}}</div>
              </div>
              <div class="tr fbox scaleblock one_px_border_b">
                <div>商业险保单有效期</div>
                <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}~{{new Date(item.createTime+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
              </div>

              <template v-if="type.orderStatus==0">
                <div class="tr fbox scaleblock one_px_border_b">
                  <div>下单时间</div>
                  <div>{{new Date(type.createTime).Format("yyyy-MM-dd")}}</div>
                </div>
                <div class="tr fbox scaleblock">
                  <div></div>
                  <div class="fbox f-end">
                    <a class="btn" @click="cancelInsurance(item.orderId,item.businessInsur,item.cvvInsur,1)">取消投保</a>
                    <a class="btn" @click="continueInsurance(item.orderId)">继续投保</a>
                    <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
                  </div>
                </div>
              </template>
              <template v-if="type.orderStatus==1">
                <div class="tr fbox scaleblock one_px_border_b">
                  <div>完成时间</div>
                  <div>{{new Date(type.updateTime).Format("yyyy-MM-dd")}}</div>
                </div>
                <div class="tr fbox scaleblock">
                  <div></div>
                  <div class="fbox f-end">
                    <a class="btn" @click="installmentContract(item.orderId)">分期合同</a>
                    <a class="btn" @click="repaymentBill(item.orderId)">还款账单</a>
                    <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
                  </div>
                </div>
              </template>
              <template v-if="type.orderStatus==15">
                <div class="tr fbox scaleblock one_px_border_b">
                  <div>取消时间</div>
                  <div>{{new Date(type.updateTime).Format("yyyy-MM-dd")}}</div>
                </div>
                <div class="tr fbox scaleblock">
                  <div></div>
                  <div class="fbox f-end">
                    <!--<a class="btn btn-red">已取消</a>
                    <a class="btn" @click="continueInsurance(item.orderId)">继续投保</a>-->
                    <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
                  </div>
                </div>
              </template>

            </template>
          </template>

          <div class="gap"></div>

          <template v-for="type of item.orderInsuranceList">
            <template v-if="type.compositeType=='tci'">
              <div class="th fbox scaleblock one_px_border_b">
                <div class="icon-has force">交强险保单</div>
                <div class="red">￥{{item.compulInsurAmount}}</div>
              </div>
              <div class="tr fbox scaleblock one_px_border_b">
                <div>交强险保单有效期</div>
                <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}~{{new Date(item.createTime+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
              </div>
              <div class="tr fbox scaleblock one_px_border_b">
                <div>下单时间</div>
                <div>{{new Date(type.updateTime).Format("yyyy-MM-dd")}}</div>
              </div>
              <div class="tr fbox scaleblock">
                <div></div>
                <div v-if="type.orderStatus==0" class="fbox f-end">
                  <a class="btn" @click="cancelInsurance(item.orderId,item.businessInsur,item.cvvInsur,2)">取消投保</a>
                  <a class="btn" @click="continueInsurance(item.orderId)">继续投保</a>
                  <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
                </div>
                <div v-if="type.orderStatus==1" class="fbox f-end">
                  <a class="btn" @click="installmentContract(item.orderId)">分期合同</a>
                  <a class="btn" @click="repaymentBill(item.orderId)">还款账单</a>
                  <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
                </div>
                <div v-if="type.orderStatus==15" class="fbox f-end">
                  <a class="btn btn-red">已取消</a>
                  <a class="btn" @click="continueInsurance(item.orderId)">继续投保</a>
                  <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
                </div>
              </div>
            </template>
          </template>


        </template>
        <template v-if="item.orderStatus==1">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已完成</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has business">商业保单</div>
            <div class="red">￥{{item.orderAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>商业险保单有效期</div>
            <div>{{new Date(item.businessInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.businessInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>

          <template v-if="item.compulInsurStatus==1">
            <div class="tr fbox scaleblock one_px_border_b">
              <div>付款时间</div>
              <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
            </div>
            <div class="tr fbox scaleblock">
              <div></div>
              <div class="fbox f-end">
                <a class="btn" @click="installmentContract(item.orderId)">分期合同</a>
                <a class="btn" @click="repaymentBill(item.orderId)">还款账单</a>
                <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
              </div>
            </div>
          </template>
          <template v-if="item.compulInsurStatus==5">
            <div class="tr fbox scaleblock one_px_border_b">
              <div>退保时间</div>
              <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
            </div>
            <div class="tr fbox scaleblock">
              <div></div>
              <div class="fbox f-end">
                <a class="btn">取消投保</a>
                <a class="btn">继续投保</a>
                <a class="btn btn-blue" href="#/orderDetail">查看详情</a>
              </div>
            </div>
          </template>
          <template v-if="item.compulInsurStatus==15">
            <div class="tr fbox scaleblock one_px_border_b">
              <div>取消时间</div>
              <div>{{new Date(item.updateTime).Format("yyyy-MM-dd")}}</div>
            </div>
            <div class="tr fbox scaleblock">
              <div></div>
              <div class="fbox f-end">
                <!--<a class="btn">取消投保</a>
                <a class="btn">继续投保</a>-->
                <a class="btn btn-blue" href="#/orderDetail">查看详情</a>
              </div>
            </div>
          </template>

          <div class="gap"></div>

          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has force">交强险保单</div>
            <div class="red">￥{{item.compulInsurAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>交强险保单有效期</div>
            <div>{{new Date(item.compulInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.compulInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>

          <template v-if="item.installmentStatus==1">
            <div class="tr fbox scaleblock one_px_border_b">
              <div>付款时间</div>
              <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
            </div>
            <div class="tr fbox scaleblock">
              <div></div>
              <div class="fbox f-end">
                <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
              </div>
            </div>
          </template>
          <template v-if="item.installmentStatus==5">
            <div class="tr fbox scaleblock one_px_border_b">
              <div>退保时间</div>
              <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
            </div>
            <div class="tr fbox scaleblock">
              <div></div>
              <div class="fbox f-end">
                <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
              </div>
            </div>
          </template>
          <template v-if="item.installmentStatus==15">
            <div class="tr fbox scaleblock one_px_border_b">
              <div>取消时间</div>
              <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
            </div>
            <div class="tr fbox scaleblock">
              <div></div>
              <div class="fbox f-end">
                <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
              </div>
            </div>
          </template>

        </template>
        <template v-if="item.orderStatus==10">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已退保</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has business">商业保单</div>
            <div class="red">￥{{item.orderAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>商业险保单有效期</div>
            <div>{{new Date(item.businessInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.businessInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>退保时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="installmentContract(item.orderId)">分期合同</a>
              <a class="btn" @click="repaymentBill(item.orderId)">还款账单</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>

          <div class="gap"></div>

          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has force">交强险保单</div>
            <div class="red">￥{{item.compulInsurAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>交强险保单有效期</div>
            <div>{{new Date(item.compulInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.compulInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>

          <div class="tr fbox scaleblock one_px_border_b">
            <div>退保时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>

          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
        <template v-if="item.orderStatus==15">
          <div class="th fbox scaleblock one_px_border_b">
            <div>{{item.insuranceCompany.insuranceName}}</div>
            <div>已取消</div>
          </div>
          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has business">商业保单</div>
            <div class="red">￥{{item.orderAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>商业险保单有效期</div>
            <div>{{new Date(item.businessInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.businessInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>取消时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>
          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="deleteOrder(item.orderId)">删除</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>

          <div class="gap"></div>

          <div class="th fbox scaleblock one_px_border_b">
            <div class="icon-has force">交强险保单</div>
            <div class="red">￥{{item.compulInsurAmount}}</div>
          </div>
          <div class="tr fbox scaleblock one_px_border_b">
            <div>交强险保单有效期</div>
            <div>{{new Date(item.compulInsurDate).Format("yyyy-MM-dd")}}~{{new Date(item.compulInsurDate+31536000000-86400000).Format("yyyy-MM-dd")}}</div>
          </div>

          <div class="tr fbox scaleblock one_px_border_b">
            <div>取消时间</div>
            <div>{{new Date(item.createTime).Format("yyyy-MM-dd")}}</div>
          </div>

          <div class="tr fbox scaleblock">
            <div></div>
            <div class="fbox f-end">
              <a class="btn" @click="deleteOrder(item.orderId)">删除</a>
              <a class="btn btn-blue" @click="viewDetails(item.orderId)">查看详情</a>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!--取消订单-->
    <confirm v-model="confirm" title="提示" @on-confirm="onConfirm(confirmOrderId,confirmCancelType)">
      <p style="text-align:center;">{{confirmTxt}}</p>
    </confirm>

    <!--删除订单-->
    <confirm v-model="deleteOrderBoolean" title="提示" @on-confirm="deleteOrderCon(confirmOrderId)">
      <p style="text-align:center;">{{deleteOrderTxt}}</p>
    </confirm>

    <alert v-model="alertB" title="提示"> {{alertT}}</alert>
  </div>
</template>

<script>
  import {Confirm, Alert } from 'vux'
  export default {

    components: {
      Confirm,
      Alert
    },
    data () {
      return {
        mainData:{},
        orderStatus:this.$route.query.orderStatus,
        confirm:false,
        confirmOrderId:'',
        confirmCancelType:'',
        confirmTxt:'',

        deleteOrderBoolean:false,
        deleteOrderTxt:'是否删除此订单？',

        alertB:false,
        alertT:''
      }
    },
    methods: {
      cancelInsurance(a,b,c,d){
        //a 订单id
        //b 是否有商业险 1 0
        //c 是否有交强险 1 0
        //d 既有商业险也有交强险时，1代表商业险，2代表交强险
        this.confirmOrderId=a;
        if(b==1&&c==0){
          this.confirmCancelType='vci';
          this.confirmTxt='是否要取消此定单？'
        }
        if(b==0&&c==1){
          this.confirmCancelType='tci';
          this.confirmTxt='是否要取消此定单？'
        }
        if(b==1&&c==1){
          //this.confirmCancelType='all';
          if(d==1){
            this.confirmCancelType='vci';
            this.confirmTxt='是否要取消此定单的商业险？'
          }else if(d==2){
            this.confirmCancelType='tci';
            this.confirmTxt='是否要取消此定单的交强险？'
          }
        }
        this.confirm=true;
      },
      continueInsurance(a){
        //继续投保
        this.$router.push({path:'/installmentInfo',query: {orderId:a}})
      },
      viewDetails(a){
        //查看详情
        this.$router.push({path:'/orderDetail',query: {orderId:a}})
      },
      onConfirm (orderId,cancelType) {
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/cancelOrder",
          params: {orderId:orderId,cancelType:cancelType},
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxODU3NTU2MDQ2MiIsImlhdCI6MTQ5ODAzMjE2MSwic3ViIjoibG9naW5fdG9rZW4iLCJhdWQiOiJ7XCJpZENhcmRcIjpcIjQ1MDEyMTE5OTAwNTI1NjAzMlwiLFwicGhvbmVcIjpcIjE4NTc1NTYwNDYyXCJ9IiwiZXhwIjoxNDk4NjM2OTYxfQ.qjIgIw2XoHFPuAOZtDSZgqH5fm-tu4l_EPqB0jtxwDM'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            //取消成功
            this._init();
          }else{
            this.alertT=res.data.message;
            this.alertB=true;
          }

        }, function (error) {
          this.alertT='系统故障，请重试';
          this.alertB=true;
        })
      },
      deleteOrderCon(orderId){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/delete",
          params: {orderId:orderId},
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxODU3NTU2MDQ2MiIsImlhdCI6MTQ5ODAzMjE2MSwic3ViIjoibG9naW5fdG9rZW4iLCJhdWQiOiJ7XCJpZENhcmRcIjpcIjQ1MDEyMTE5OTAwNTI1NjAzMlwiLFwicGhvbmVcIjpcIjE4NTc1NTYwNDYyXCJ9IiwiZXhwIjoxNDk4NjM2OTYxfQ.qjIgIw2XoHFPuAOZtDSZgqH5fm-tu4l_EPqB0jtxwDM'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            //删除成功
            this._init();
          }else{
            this.alertT=res.data.message;
            this.alertB=true;
          }

        }, function (error) {
          this.alertT='系统故障，请重试';
          this.alertB=true;
        })
      },
      installmentContract(a){
        //分期合同

      },
      repaymentBill(a){
        //还款账单

      },
      deleteOrder(a){
        //删除账单
        this.confirmOrderId=a;
        this.deleteOrderBoolean=true
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/get",
          params: {orderStatus:this.orderStatus},
          headers: {
            'Content-Type': 'application/json',
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
    created:function(){
      this.$parent.init();
      this._init();
    }

  }
</script>

<style scoped>
  /*.full-screen{height: 100%;}*/
  .fbox {
    display: flex;
    font-size: 15px;
    align-items: center;
    -webkit-align-items: center;
  }
  .fbox.f-end{justify-content:flex-end;height:44px;}
  .scaleblock > *:last-child {
    flex: 1
  }
  .group {
    margin: 10px 10px 0 10px;
    padding: 10px;
    background: #fff;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
  }
  .group:last-child{margin-bottom: 15px;}
  .icon-has {
    position: relative;
    text-indent: 30px;
    color: #0b92f1!important;
    font-size: 17px;
  }
  .icon-has:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 13px;
    width: 22px;
    height: 22px;
  }
  .th > div:last-child{color: #7990a2;font-size: 15px;}

  .icon-has.business:before{
    background:url('../../assets/order_icon1.png');
    background-size:22px 22px;
    background-repeat:no-repeat;
  }
  .icon-has.force:before{
    background:url('../../assets/order_icon2.png');
    background-size:22px 22px;
    background-repeat:no-repeat;
  }
  /*.group.business-force .th > div:first-child:before{
    background:url('../../assets/order_icon3.png');
    background-size:22px 22px;
    background-repeat:no-repeat;
  }*/
  .th > div:first-child, .tr > div:first-child {
    text-align: left;
    padding: 10px 0;
    color: #7990a2;
  }

  .th > div:last-child, .tr > div:last-child {
    text-align: right;
    color: #434f5d;
  }
  .btn{
    border: 1px solid #eef2f9;
    border-radius: 3px;
    padding: 2px 8px;
    color: #404b54;
    margin-left:10px;
    min-width:78px;
    text-align: center;
  }
  .btn.btn-blue{
    border: 1px solid #0b92f1;
    background: #0b92f1;
    color: #fff;
  }
  .btn.btn-red{
    border: 1px solid red;
    background: red;
    color: #fff;
  }

  .gap{height:5px;background: #eef2f9;margin:5px 0}
</style>
