<template>
   <div class="no-data">
      <slot>
         <img class="n-img" src="../assets/no_data.png" alt="">
         <p class="n-txt">暂无数据</p>
      </slot>
   </div>
</template>

<script>
   export default {  
      name: 'noData',
      //props: ['txt','imgSrc']
   }
</script>

<style lang="less" scoped>
   @import '~vux/src/styles/1px.less';
   @import '~vux/src/styles/center.less';

   .no-data{text-align: center;font-size: 12px;color: #666;}
   .no-data .n-img{width: 185px;height:105px;margin: 50px auto 20px;}
   .no-data .n-txt{}
</style>
