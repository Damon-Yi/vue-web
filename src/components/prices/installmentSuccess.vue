<template>
  <div class="full-screen">
    <div class="div1">
      <!--<img class="full-size" src="../../assets/process.png">-->
    </div>
    <div v-show="cvv1">
      <div class="div2">
        <div class="txt">恭喜您，商业险分期成功，现在即可享受商业险理赔服务
          理赔请联系保险公司99999<br>
          您还差一步即可享受交强险理赔服务，交强险需一次性支付</div>
      </div>
      <btn msg="支付交强险" @btnClickEvent="goto1"></btn>
    </div>

    <div v-show="cvv2">
      <div class="div2">
        <div class="txt">恭喜您，商业险分期成功，请在订单列表中查看商业险保单信息</div>
      </div>
      <btn msg="查看投保订单" @btnClickEvent="goto2"></btn>
    </div>

    <div v-show="cvv3">
      <div class="div2">
        <div class="txt">恭喜您，交强险保单已出，现在即可享受商业险和交强险理赔服务
          理赔请联系保险公司99999</div>
      </div>
      <btn msg="查看投保订单" @btnClickEvent="goto3"></btn>
    </div>
  </div>
</template>

<script>
  import Btn from '../widget/buttom-1'
  export default {
    name: 'atPrice',
    components: {
      'btn': Btn
    },
    methods: {
      goto1:function(){
        console.log(this.cvvInsur)

      },
      goto2:function(){
        this.$router.push({path:'/order',query: {}})
      },
      goto3:function(){
        this.$router.push({path:'/order',query: {}})
      }
    },
    data () {
      return {
        cvvInsur:+this.$route.query.cvvInsur,
        value22 : sessionStorage.lastname
      }
    },
    computed:{
      cvv1(){
        if(this.cvvInsur==1)
        return true;
      },
      cvv2(){
        if(this.cvvInsur==0)
          return true;
      },
      cvv3(){
        if(this.cvvInsur==2)
          return true;
      }
    },
    created(){
      this.$parent.init();
      sessionStorage.lastname="Smith";
    }
  }
</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  .full-screen{background-color:#fff;height:100%;}
  .div1{width:95%;margin:0 auto;padding:50px 0 60px;text-align: center}
  .div1>img{max-width:640px;}
  .div2{width:100%;margin:0 auto 60px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;font-weight: bold;padding:0 15px}
</style>
