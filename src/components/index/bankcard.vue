<template>
	  <div class="bankcard">
		    <div class="bankcard_centent">
			      <div class="bankcard_centent_box ">
				        <div class="box_title">银行卡正面</div>
				        <div class="right_cent">
					        	<span class="succeed" v-if="bankCardFront" @click="showImgBut(bankCardFront)">查看图片</span>
					        	<div class="zm_but" v-else>
						        		<span>点击上传</span>
						        		<input type="file" multiple capture="camera"  accept="image/*" @change="carFileChange" />
					        	</div>
				        </div>
			      </div>
		    </div>
	
		    <div class="d1">
			      <div class="tr one_px_border_b">
				        <div>持卡人姓名</div>
				        <div>{{realName}}</div>
			      </div>
			      <!--持卡人银行卡号-->
			      <div class="tr one_px_border_b">
				        <div>持卡人银行卡号</div>
				        <div><input type="number" placeholder="请输入持卡人银行卡号" v-model="bankAccount"></div>
			      </div>
			      <!--银行预留手机号-->
			      <div class="tr one_px_border_b">
				        <div>银行预留手机号</div>
				        <div><input type="number" placeholder="请输入银行预留手机号" v-model="reservedPhone"></div>
			      </div>
			      <!--开户银行-->
			      <div class=" one_px_border_b accoun">
			      		<popup-picker title="开户银行" placeholder="请选择开户银行" :data="BankText" v-model="Bankval" @on-change="onChange" value-text-align="right"></popup-picker>
			      </div>
						<!--开户省市-->
			      <div class="tr one_px_border_b sheng" id="shengshiname">
			        	<x-address title="开户省市" placeholde="请输入开户省市" @on-hide="addreChange" v-model="addData" raw-value :list="addressData"  hide-district></x-address>
			      </div>
			      <!--请选择支行-->
			      <div class=" one_px_border_b accoun">
			      		<popup-picker placeholder="请选择支行" title="支行名称" :data="BranchText" v-model="Branchval" @on-change="Change" value-text-align="right"></popup-picker>
			      </div>
			      <!--校验卡等待框-->
			      <div class="loding">
				      	<loading v-model="show" :text="showtext" ></loading>
				    </div>
				    <!--错误提示语-->
				    <div>
					      <alert v-model="alertShow" title="温馨提示" > {{alertTxt}}</alert>
					  </div>
					  <!--查看银行卡图片-->
					  <div>
					      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
						        <div class="img-box">
						          	<img :src="shouImg" style="max-width:100%;max-height:50%">
						        </div>
					      </x-dialog>
				    </div>
					  <!--上下一步-->
			      <div class="box_button">
								<div class="backs" @click="back">上一步</div>
								<div class="nexts" @click="bankNexts">下一步</div>
					  </div>
		    </div>
	  </div>
</template>

<script>
	  import { Group,Selector,XAddress,PopupPicker,Loading,Alert,XDialog} from 'vux'
	  import cookie from '../../config/cookie' 
	  import compres from '../../config/compress' 
	  export default {
		    props: {
		    	
		    },
		    components: {
		    	Group,
		      Selector,
		      XAddress,
		      PopupPicker,
		      Loading,
		      Alert,
		      XDialog
		    },
		    data () {
			      return {
				        realName:'',//持卡人姓名
				        cardid:'',//身份证号
				        bankCardFront:'',//银行卡正面照片路径
				        addressData: [],//省市地址
				        addData:[],  //省市值
				        BankInfo:[],//银行列表
				        BankText:[['']],//银行名称列表
				        Bankval:[],//银行val
				        branchInfo:[],//分行列表 
				        bankName:"",//银行名称
				        reservedPhone:'',//预留手机号
				        bankAccount:'',//银行卡号
				        bankAbbreviation:'',//银行简称
				        type:1,//操作类型
				        bankProvince:"",//开户省名称
				        bankCity:"",//开户市名称
				        bankProvinceCode:"",//开户省编码
				        bankCityCode:"",//市编码
				        shengshiname:[],//省市名称
				        BankInfobj:{},////总行编码     //银行简称 //银行名称
				        BranchText:[['']],//支行名称列表
				        Branchval:[],//支行val
				        BranchInfobj:{},////支行编码      //支行名称
				        show:false,//显示刷新验证银行卡
				        showtext:"",
				        token:'',//获取token
				        showHideOnBlur: false,//图片提示框
				        shouImg:'',//图片提示框内容
				        alertShow:false,//错误提示框
				        alertTxt:'',//错误提示语
			      }
		    },
		    //实例已经创建完成之后
			  created(){
			    	this.realName = this.$route.query.name?this.$route.query.name:'';
			    	this.cardid = this.$route.query.cardNo?this.$route.query.cardNo:'';
			      this.$parent.init();
				},
				watch:{
		
				},
				//组件写入dom结构之前
				mounted(){
			      //获取url信息    
			      var _this=this;
			      this.token=cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';
			      
			      _this.$http.post(this.$root.url+"basedata/getAreaInfo", {
			      	
			      }, {
				      	headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
				    }).then(function(data) {// 这里是处理正确的回调
				        var datas = data.body.data;
				        if(datas){
				        	this.addressData = datas;
				        }
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
				    //获取银行卡列表
				    _this.$http.post(this.$root.url+"basedata/getBankInfo", {
			      	
			      }, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
				    }).then(function(data) {// 这里是处理正确的回调
				        var datas=data.body.data;
				        if(datas){
				        	this.BankInfo=datas;
				        	this.BankText = setDatas(datas);
				        }
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
				},
		    //方法对象
		    methods:{
			    	//查看卡图片
			    	showImgBut(url){
			    		this.showHideOnBlur = true;
			    		this.shouImg = url
			    	},
			    	//银行卡拍照
						carFileChange(e){
								var _this = this;
								var files = e.target.files || e.dataTransfer.files;
								if(!files.length) return;
								var fiss = files[0];
								var maxsize = 3*1024*1024;
								var nubms = fiss.size>maxsize ? '0.7' : '1';
				        compres.comprImg.uploadImg(fiss,maxsize,nubms,function(data){
					          var text = window.atob(data.split(",")[1]);
								    var buffer = new Uint8Array(text.length);
								    var pecent = 0, loop = null;
								    for (var i = 0; i < text.length; i++) {
								      buffer[i] = text.charCodeAt(i);
								    }
								    var blob = compres.comprImg.getBlob([buffer], fiss.type);
				          	var formDa = new FormData();
			          		formDa.append("file", blob);
					        	formDa.append("fileName", fiss.name);
				          	_this.uploaGr(formDa);  ////上传个人照发送请求
				        })
						},
			      //银行卡url发送请求
						uploaGr(formDa){
								var _this = this;
								_this.$http.post(this.$root.url+"upload/upload", formDa, {
							        headers: {'Content-Type': 'application/json;charset=UTF-8'},
							    }).then(function(data) {// 这里是处理正确的回调
							        var datas=data.body.data;
							        if(datas&&data.body.ask==0){
							       	  _this.bankCardFront = datas; //银行卡url
							        }
							    }, function(error) {// 这里是处理错误的回调
							        console.log(error)
							  });
						},
						//选中银行值发生变化
						onChange(val){
								var _this = this;
								this.BankInfobj = getBankItem(val,this.BankInfo);
								//获取支行列表
								BranchMonitor(_this,this.BankInfobj,this.addData,function(datas){
									_this.BranchText = setDatas(datas);
								})
						},
						//选中开户省市时调用方法
						addreChange(va){
								//获取支行列表
								var _this = this;
								this.shengshiname = getaddres(this.addData,this.addressData);
								BranchMonitor(_this,this.BankInfobj,this.addData,function(datas){
									_this.branchInfo = datas;
									_this.BranchText = setDatas(datas);
								})
						},
						//选中支行
						Change(va){
								var _self = this;
								this.BranchInfobj = getBankItem(va,this.branchInfo);
						},
						//上一步
						back(){
								window.history.go(-1)
						},
						//下一步
						bankNexts(){
								var self=this;
								if(this.bankCardFront==""){
						    		this.alertTxt="银行卡没上传";
								    this.alertShow=true
								    return false
					    	}else if(this.realName==""){
						    		this.alertTxt="持卡人姓名不能为空";
								    this.alertShow=true
								    return false
					    	}else if(this.bankAccount==""){
						    		this.alertTxt="持卡人银行卡号不能为空";
								    this.alertShow=true
								    return false
					    	}else if(this.reservedPhone==""){
						    		this.alertTxt="预留手机号不能为空";
								    this.alertShow=true
								    return false
					    	}else if(this.Bankval.length<=0){
						    		this.alertTxt="开户行不能为空";
								    this.alertShow=true
								    return false
					    	}else if(this.shengshiname.length<=0){
						    		this.alertTxt="开户省市不能为空";
								    this.alertShow=true
								    return false
					    	}else if(this.Branchval.length<=0){
					    			this.alertTxt="开户支行不能为空";
								    this.alertShow=true
								    return false
					    	}
								var prenm={
									"type":this.type,
									"bankAbbreviation":this.BankInfobj?this.BankInfobj.bankCodeDk:'',
									"bankAccount":this.bankAccount,
									"realName":this.realName,
									"bankProvince":this.shengshiname[0].name,
									"bankCity":this.shengshiname[1].name,
									"bankCardFront":this.bankCardFront,
									"subbranchName":this.BranchInfobj?this.BranchInfobj.bankName:'',
									"bankName":this.BankInfobj?this.BankInfobj.bankName:'',
									"bankCode":this.BranchInfobj?this.BranchInfobj.bankCode:'',
									"reservedPhone":this.reservedPhone,
									"bankProvinceCode":this.shengshiname[0].id,
									"bankCityCode":this.shengshiname[1].id,
									"parentBankCode":this.BankInfobj?this.BankInfobj.bankCode:''
								}
								
								self.$http.post(this.$root.url+"basedata/saveOrUpdateBankCard", prenm , {
							        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
							        before:function(){
							        	this.show = true;
							        },
							        progress:function(){
							        	this.show = false;
							        }
							    }).then(function(data) {// 这里是处理正确的回调
							        console.log(data)
							        if(data.body.ask == 0){
							       	  this.$router.push({path:'/datum',query: {"name":this.realName,"cardid":this.cardid}})//跳转路由模块
							        }else{
							        	this.alertTxt = data.body.message;
							       	  this.alertShow = true
							        }
							    }, function(error) {// 这里是处理错误的回调
							        console.log(error)
							  });
						}
	    }
	    
	  }
	  //处理数据
	  function setDatas(data){
		  	var tmpList = [[]];
		   	for(var i=0;i<data.length;i++){
		   		tmpList[0].push(data[i].bankName)
		   	}
		// 	console.log(JSON.stringify(tmpList))
		   	return tmpList;
	  }
	  //返回银行卡编码和名称、简称
		function getBankItem(str,arr){
				var obj = {};
				for(var i=0;i<arr.length;i++){
					if(arr[i].bankName==str){
						obj.bankCode = arr[i].bankCode;
						obj.bankCodeDk=arr[i].bankCodeDk;
						obj.bankName = arr[i].bankName;
					}
				}
				return obj.bankCode?obj:'';
		}
		//获取省市的名称
		function getaddres(st,arrs){
				var addobj = [];
				for(var i=0;i<arrs.length;i++){
					if(arrs[i].value==st[0]||arrs[i].value==st[1]){
						addobj.push({
							name:arrs[i].name,
							parent:arrs[i].parent,
							id:arrs[i].value
						});
					}
				}
				return addobj;
		}
		//监听获取支行列表
		function BranchMonitor(_this,banObj,provinceObj,callback){
				if(banObj&&provinceObj.length>0){
					_this.$http.post(_this.$root.url+"basedata/getBankInfo", {
						"bankCityCode":provinceObj[1],"parentCode":banObj.bankCode
					}, {
			        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":_this.token},
			    }).then(function(data) {// 这里是处理正确的回调
		        var datas=data.body.data;
		        if(datas&&datas.length>0){
				       callback(datas);
		        }
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			    }); 
				}
		}
	
</script>

<style scoped>
	  .d2{padding:10px 0;background: #fff;height:100px;}
	  .d1{margin:15px;padding:10px;background: #fff;}
	  .tr{display: flex;font-size:16px;}
	  .tr>*{padding:15px 0;}
	  .tr>*:first-child{text-align: left;color:#8ca3b5;}
	  .tr>*:last-child{flex:1;text-align: right;color:#434f5d;}
	  
	  .bankcard_centent{padding:2px 10px;background: #fff;}
	  .bankcard_centent_box{display: flex;font-size:16px;width:100%;position:relative;}
	  .bankcard_centent_box .box_title{text-align: left;color:#8ca3b5;padding:15px 0 15px 10px}
	  .bankcard_centent_box .right_cent{flex:1;text-align: right;color:#434f5d;padding:15px 10px 15px 0px}
	  .bankcard_centent_box .right_cent .zm_but{width:120px;display: inline-block;position:relative;padding-right:20px;background:url(../../assets/xiangji_icon.png) no-repeat right center;background-size:27px 19px;}
	  .bankcard_centent_box .right_cent .zm_but span{display: block;width:100%;text-align: center;color:#8ca2b7}
	  .succeed{color:#2491FF}
	  .bankcard_centent_box .right_cent .zm_but input{ position: absolute;display: block;width: 100%;height: 100%;opacity: 0;z-index: 2;left:0;top:0;border-radius: 3px;}
	
	  .select select{width:auto;height:30px;text-align: center;}
	  .select select option{text-align: center;}
	  .tablev{display: table;width: 100%;height: 100%;text-align: center;font-size:14px;color:#8ca3b5;line-height: 1}
	  .tablev>*{display: table-cell;vertical-align: middle;}
	  .tablev>*>img{max-width: 50px;height: auto;}
	  
	
	  input{outline: 0;border: 0;text-align: right;font-size:16px;}
	  select{font-size:16px;}
	  .box_button{padding:7.625% 6.25%;width:87.5%;margin:0 auto;}
		.box_button:after{clear:both;content: '';display: block;}
		.box_button .backs{width:45%;display: inline-block;margin-right:3.90625%;float:left;padding:10px 0;text-align: center;border:1px solid #8CA3B5;color:#adbdc9}
		.box_button .nexts{width:45%;display: inline-block;margin-left:3.90625%;float:left;padding:10px 0;text-align: center;background:#2491ff;color:#fff;border:1px solid #2491ff;}     
	

</style>
<style>
		.sheng .vux-cell-box:before,.accoun .vux-cell-box:before{border-top:none;height:0;}
		.sheng .weui-cell{padding:0;}
		.sheng label,.accoun label{text-align:left;color:#8ca3b5}
		.accoun .weui-cell{padding:15px 0px;}
		/*.loding .weui-toast{width:50%;}*/
</style>
