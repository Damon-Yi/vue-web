<template>
  <div class="identity">
    <div class="identity_centent">
      <div class="identity_centent_box ">
        <div class="box_title">身份证正面</div>
        <div class="right_cent">
        	<span class="succeed" v-if="card1statu" @click="showImgBut(card1url)">查看图片</span>
        	<div class="zm_but" v-else>
        		<span>点击上传</span>
        		<input type="file" multiple capture="camera"  accept="image/*" @change="onFileChange" />
        	</div>
        </div>
      </div>
      <div class="identity_centent_box ">
        <div class="box_title">身份证反面</div>
        <div class="right_cent">
        	<span class="succeed" v-if="card2statu" @click="showImgBut(card2url)">查看图片</span>
        	<div class="zm_but" v-else>
        		<span>点击上传</span>
        		<input type="file" multiple capture="camera"  accept="image/*" @change="onFileChange"/>
        	</div>
        </div>
      </div>
      <div class="identity_centent_box ">
        <div class="box_title">个人近照</div>
        <div class="right_cent">
        	<span class="succeed" v-if="grUrl" @click="showImgBut(grUrl)">查看图片</span>
        	<div class="zm_but" v-else>
        		<span>点击上传</span>
        		<input type="file" multiple capture="camera"  accept="image/*" @change="grFileChange" />
        	</div>
        </div>
      </div>
    </div>

    <div class="d1">
    	  <div class="tr one_px_border_b">
            <div>姓名</div>
            <div>{{name}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>性别</div>
            <div>{{gender}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>身份证号</div>
            <div>{{citizen_id}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>有效期</div>
            <div>{{valid_date_end}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>签发机关</div>
            <div>{{agency}}</div>
        </div>
        <div>
		      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
		        <div class="img-box">
		          <img :src="shouImg" style="max-width:100%;max-height:50%">
		        </div>
		        <div @click="showHideOnBlur=false">
		          <span class="vux-close"></span>
		        </div>
		      </x-dialog>
		    </div>
		    <div>
		      <alert v-model="alertShow" title="温馨提示"> {{alertTxt}}</alert>
		    </div>
        <div class="box_button">
					<div class="nexts_1" @click="identNext">下一步</div>
			  </div>
    </div>
  </div>

</template>

<script>
  import { XButton,XDialog,Alert} from 'vux'
  import cookie from '../../config/cookie' 
	import compres from '../../config/compress' 
  export default {
    props: {

    },
    components: {
      XButton,
      XDialog,
      Alert
    },
    data () {
      return {
        citizen_id:'',//身份证号
        card1url:'',//身份证正面地址
        card1statu:false,//身份证正面状态
        card2url:'',//身份证反面地址
        card2statu:false,////身份证反面状态
        name:'',//名字
        gender:'',//性别
        birthday:'',//生日
        filemess:"",//
        agency:"",//签证机关
        valid_date_end:"",//有效期
        grUrl:"",  //个人近照url
        shouImg:'',//查看图片
        showHideOnBlur: false,//图片提示框
        alertShow:false,//错误提示框
        alertTxt:'',//错误提示语
      }
    },
    //实例已经创建完成之后
	  created(){
			this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
           
		},
    //方法对象
    methods:{
    	showImgBut(url){
    		this.showHideOnBlur=true;
    		this.shouImg=url
    	},
    	//身份证正面
    	onFileChange(e) {
    		var self = this;
				var files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				var fil = files[0];
				var maxsize = 3*1024*1024;
				var nubms = fil.size>maxsize ? '0.7' : '1';
            compres.comprImg.uploadImg(fil,maxsize,nubms,function(data){
//          	console.log("3333333",data)
		          self.filemess = data;
		          
		          var text = window.atob(data.split(",")[1]);
					    var buffer = new Uint8Array(text.length);
					    var pecent = 0, loop = null;
					    for (var i = 0; i < text.length; i++) {
					      buffer[i] = text.charCodeAt(i);
					    }
					    var blob = compres.comprImg.getBlob([buffer], fil.type);
		          console.log(blob)
              var formData = new FormData();
			        formData.append("file", blob);
			        formData.append("fileName", fil.name);
			        formData.append("auto_rotate","true");
			        formData.append("ocr_mode","3");
			        formData.append("ocr_type","1");
		          self.uploaIdCar(formData);  ////上传身份证正反面
            })
			},
			//上传身份证正反面
			uploaIdCar(formData){
				var self = this;
				 self.$http.post(self.$root.url+"ocr/common", formData , {
						        headers: {'Content-Type': 'application/json;charset=UTF-8'},
						    }).then(function(data) {// 这里是处理正确的回调
						        console.log(data)
						        var datas=data.body.data;
						        if(datas.result &&datas.result.idcard_ocr_result && datas.result.idcard_ocr_result.citizen_id){
						       	  this.card1url=datas.url;
						       	  this.citizen_id=datas.result.idcard_ocr_result.citizen_id;
						       	  this.name=datas.result.idcard_ocr_result.name;
						       	  this.gender=datas.result.idcard_ocr_result.gender;
						       	  if(this.citizen_id!=""&&this.name!=""&&this.gender!=""){
						       	  	this.card1statu=true
						       	  }else{
						       	  	this.alertTxt="照片上传不成功";
						       	  	this.alertShow=true
						       	  }
						        }else if(datas.result &&datas.result.idcard_ocr_result && datas.result.idcard_ocr_result.agency){
						       	  this.card2url=datas.url;
						       	  this.valid_date_end=datas.result.idcard_ocr_result.valid_date_end;
						       	  this.agency=datas.result.idcard_ocr_result.agency;
						       	  if(this.valid_date_end!=""&&this.agency!=""){
						       	  	this.card2statu=true
						       	  }else{
						       	  	this.alertTxt="照片上传不成功";
						       	  	this.alertShow=true
						       	  }
						        }else{
						        	this.alertTxt="无效的照片，请重新上传!";
						       	  this.alertShow=true
						        }
						    }, function(error) {// 这里是处理错误的回调
						        console.log(error)
						  });
			},
			//个人近照
			grFileChange(e){
				var _this=this;
				var files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				console.log(files)
				var fiss=files[0];
				var maxsize=3*1024*1024;
				var nubms = fiss.size>maxsize ? '0.7' : '1';
            compres.comprImg.uploadImg(fiss,maxsize,nubms,function(data){
//		          _this.filemess = data;
		          var text = window.atob(data.split(",")[1]);
					    var buffer = new Uint8Array(text.length);
					    var pecent = 0, loop = null;
					    for (var i = 0; i < text.length; i++) {
					      buffer[i] = text.charCodeAt(i);
					    }
					    var blob = compres.comprImg.getBlob([buffer], fiss.type);
		          console.log(blob)
              var formDa = new FormData();
              formDa.append("file", blob);
			        formDa.append("fileName", fiss.name);
		          _this.uploaGr(formDa);  ////上传个人照发送请求
            })
			},

			//上传个人照发送请求
			uploaGr(formDa){
				var _this = this;
				_this.$http.post(this.$root.url+"upload/upload", formDa, {
			        headers: {'Content-Type': 'application/json;charset=UTF-8'},
			    }).then(function(data) {// 这里是处理正确的回调
			        console.log(data)
			        var datas=data.body.data;
			        if(datas&&data.body.ask==0){
			       	  _this.grUrl=datas; //个人近照url
			        }
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			  });
			},
      //下一步
      identNext(){
      	if(this.citizen_id!=''&&this.name!=''&&this.agency!=''&&this.gender!=''&&this.valid_date_end!=''&&this.grUrl!=''){
      		this.$http.post(this.$root.url+"ifc/verify",{
      			"name":"康总","certno":"320621198703014317"
      		}, {
					      headers: {'Content-Type': 'application/json;charset=UTF-8'},
					    }).then(function(data) {// 这里是处理正确的回调
					    	console.log(data)
					        if(data.body.ask==0){
					       	  this.$http.post(this.$root.url+"member/applicatValidate",{
                      	"name":this.name,"cardNo":this.citizen_id,"cardFront":this.card1url,
                      	"cardBack":this.card1ur2,"recentPicture":this.grUrl,"sex":this.gender,
                      	"cardAgency":this.agency,"cardValid":this.valid_date_end
                      },{
									      headers: {'Content-Type': 'application/json;charset=UTF-8'},
									    }).then(function(data) {// 这里是处理正确的回调
									    	  console.log(data)
									        if(data.body.ask==0){
									       	  this.$router.push({path:'/bankcard',query: {"name":this.name,"cardNo":this.citizen_id}})//跳转路由模块
									        }else{
									        	this.alertTxt=data.body.message;
				       	  					this.alertShow=true
									        }
									    }, function(error) {// 这里是处理错误的回调
									        console.log(error)
									  });
					        }else{
					        	this.alertTxt=data.body.message;
				       	  	this.alertShow=true
					        }
					    }, function(error) {// 这里是处理错误的回调
					        console.log(error)
					  });
      	}else{
      		this.alertTxt="提交信息不完整!";
				  this.alertShow=true
      	}
      }
			
    }
    
  }


</script>

<style scoped>
  .identity{padding:15px;}
  .fbox{display: flex;}
  .fbox>div{flex:1;height:100px;background: #fff;}
  .fbox>div:last-child{margin-left:15px;}
  .identity_centent{padding:10px 0;background: #fff;}
  .identity_centent_box{display: flex;font-size:16px;width:100%;position:relative;}
  .identity_centent_box .box_title{text-align: left;color:#8ca3b5;padding:15px 0 15px 10px}
  .identity_centent_box .right_cent{flex:1;text-align: right;color:#434f5d;padding:15px 10px 15px 0px}
  .identity_centent_box .right_cent .zm_but{width:120px;display: inline-block;position:relative;padding-right:20px;background:url(../../assets/xiangji_icon.png) no-repeat right center;background-size:27px 19px;}
  .identity_centent_box .right_cent .zm_but span{display: block;width:100%;text-align: center;color:#8ca2b7}
  .succeed{color:#2491FF}
  .identity_centent_box .right_cent .zm_but input{ position: absolute;display: block;width: 100%;height: 100%;opacity: 0;z-index: 2;left:0;top:0;border-radius: 3px;}
  .identity_centent_box:after{content: " ";position: absolute;left: 2%;right:2%;bottom: 0; width: 96%;height: 1px;
    border-bottom: 1px solid #eef0f1;color: #eef0f1;
    -webkit-transform-origin: 0 100%;transform-origin: 0 100%;-webkit-transform: scaleY(0.5); transform: scaleY(0.5);}
  
  .d1{margin-top:15px;padding:10px 0;background: #fff;}
  .tr{display: flex;font-size:16px;}
  .tr>*{padding:15px 0;}
  .tr>*:first-child{text-align: left;color:#8ca3b5;padding-left:10px;}
  .tr>*:last-child{flex:1;text-align: right;color:#434f5d;padding-right:10px;}

  .tablev{display: table;width: 100%;height: 100%;text-align: center;font-size:14px;color:#8ca3b5;line-height: 1}
  .tablev>*{display: table-cell;vertical-align: middle;}
  .tablev>*>img{max-width: 50px;height: auto;}
  
  .idennetxBut{width:60%;margin:auto;padding:25px 0 20px}
  
  .box_button{padding:7.625% 6.25%;width:87.5%;margin:0 auto;}
	.box_button:after{clear:both;content: '';display: block;}
	.box_button .nexts_1{width:50%;display:block;margin:0 auto;padding:10px 0;text-align: center;background:#2491ff;color:#fff;border:1px solid #2491ff;}     

</style>
<style>
	.idennetxBut .weui-btn_primary {background-color: #2491ff !important;}
</style>



