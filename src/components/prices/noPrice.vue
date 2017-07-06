<template>
  <div class="full-screen">
      <div class="div1">
        <img class="full-size" src="../../assets/noprice.png">
      </div>
      <div class="div2">
        <div class="txt">您的车辆暂时无法报价，请确认信息录入是否准确</div>
      </div>
      <btn2 msg1="重新报价" msg2="返回首页"></btn2>
  </div>
</template>

<script>
  import Btn2 from '../widget/buttom-2'
  export default {
    name: 'noPrice',
    components: {
      'btn2': Btn2
    },
    methods: {
    },
    data () {
      return {

      }
    },
    created(){
    }
  }
</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  .full-screen{background-color:#fff;height: 100%;}
  .div1{width:70%;margin:0 auto;padding:50px 0 20px;}
  .div2{width:100%;margin:0 auto 60px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;padding:0 15px}


</style>
