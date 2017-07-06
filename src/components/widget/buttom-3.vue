<template>
  <div class="d2 fbox">
    <div @click="btn1">{{msg1}}</div>
    <div @click="btn2">{{msg2}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      msg1: {
        default: '0'
      },
      msg2: {
        default: '1'
      }
    },
    methods: {
      btn1: function(){
        this.$emit('btn111');
      },
      btn2: function(){
        this.$emit('btn222');
      }
    }
  }
</script>

<style scoped>
  .fbox {
    display: flex;
    font-size: 15px;
    align-items: center;
  }

  .d2 {
    margin-top: 15px;
  }

  .d2 > div {
    text-align: center;
    height: 50px;
    line-height: 50px;
    flex:1;
  }

  .d2 > div:first-child {
    background: #2491ff;
    color: #fff;
  }

  .d2 > div:last-child {
    background: red;
    color: #fff;
  }

</style>
