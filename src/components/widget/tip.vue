<template>
  <div>
    <div class="div1">
      <!--<img class="full-size" src="../../assets/process.png">-->
    </div>
    <div>
      <div class="div2">
        <div class="txt">{{txt}}</div>
        <div class="txt-small">{{txtSmall}}</div>
      </div>
      <slot name="aBtn"></slot>
    </div>

  </div>
</template>

<script>
  export default {
    components: {
    },
    methods: {
      /*go:function(){
        this.$emit('btnClickEvent');

      },*/
    },
    data () {
      return {
      }
    },
    props: {
      txt: {
        default: ''
      },
      txtSmall: {
        default: ''
      },
    },
    computed:{
    },
    created(){
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
  .txt-small{font-size:14px;text-align:center;color:#3c444d;padding:0 15px}
</style>
