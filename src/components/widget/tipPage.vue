<template>
  <div class="full-screen">
    <template v-for="item of mainInfo">
      <tip v-if="item.b==true" :txt="item.t1" :txtSmall="item.t2">
        <btn slot="aBtn" :msg="item.b1" @btnClickEvent="item.go"></btn>
        <!--<btn2 v-if="btnType==2" slot="aBtn" msg1="上一步" msg2="确定分期" @btn11="" @btn22=""></btn2>-->
      </tip>
    </template>
  </div>
</template>

<script>
  import Btn from './buttom-1'
  import Btn2 from './buttom-2'
  import tip from './tip'
  export default {
    components: {
      'tip': tip,
      'btn': Btn,
      'btn2': Btn2
    },
    methods: {

    },
    data () {
      return {
        //0 已支付商业险，未支付交强险
        //1 已支付商业险，不需要支付交强险
        //0 已支付交强险
        n:+this.$route.query.tip,
        mainInfo:[
          {
            t1:'恭喜您，商业险分期成功，现在即可享受商业险理赔服务，理赔请联系保险公司99999',
            t2:'您还差一步即可享受交强险理赔服务，交强险需一次性支付',
            b1:'支付交强险',
            go(){
              alert('跳转到支付页面')
            }
          },
          {
            t1:'恭喜您，商业险分期成功，请在订单列表中查看商业险保单信息',
            t2:'',
            b1:'查看投保订单',
            go(){
              this.$router.push({path:'/order',query: {}})
            }
          },
          {
            t1:'恭喜您，交强险保单已出，现在即可享受商业险和交强险理赔服务理赔请联系保险公司99999',
            t2:'',
            b1:'查看投保订单',
            go(){
              this.$router.push({path:'/order',query: {}})
            }
          }
        ]
      }
    },
    computed:{

    },
    created(){
      this.mainInfo[this.n].b=true;
    }
  }
</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  .full-screen{background-color:#fff;height:100%;}

</style>
