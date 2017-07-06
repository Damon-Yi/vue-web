<template>
  <div class="full-screen">
    <div class="d1">
      <div v-for="item of mainData.contract_list" class="fbox scaleblock one_px_border_b">
        <div>合同号:{{item.contract_no}}</div>
        <a :href="item.image_url" target="_blank"><span>查看</span></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data(){
      return {
        mainData:''
      }
    },
    //实例已经创建完成之后
		created(){
			this.$parent.init();
		},
    methods: {
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "loadTrail/listContract",
          params: {},
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxODU3NTU2MDQ2MiIsImlhdCI6MTQ5ODAzMjE2MSwic3ViIjoibG9naW5fdG9rZW4iLCJhdWQiOiJ7XCJpZENhcmRcIjpcIjQ1MDEyMTE5OTAwNTI1NjAzMlwiLFwicGhvbmVcIjpcIjE4NTc1NTYwNDYyXCJ9IiwiZXhwIjoxNDk4NjM2OTYxfQ.qjIgIw2XoHFPuAOZtDSZgqH5fm-tu4l_EPqB0jtxwDM'
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
      this._init()
    }
  }
</script>

<style scoped>
  /*.full-screen{background-color:#eef2f9 ;}*/
  .d1 {
    background: #fff;
    padding:10px;
  }

  .d1 > div {
    padding:10px 0;
  }
  .fbox {
    display: flex;
    font-size: 13px;
    align-items: center;
  }
  .fbox.scaleblock > *:last-child {
    flex: 1;
    text-align: right;

  }
  .fbox.scaleblock > *:last-child>span{
    font-size: 14px;
    border: 1px solid #0b92f1;
    color: #0b92f1;
    border-radius: 3px;
    padding: 4px 8px;
  }
  .fbox.one_px_border_b:last-child:after{
    border-bottom: none;
  }
  /*.cols > div {
    width: 100%;
    text-align: right;
    padding: 10px 0;
    color: #7990a2;
  }*/

</style>
