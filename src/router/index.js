import Vue from 'vue'
import Router from 'vue-router'
//index
import Indexs from '@/components/index/Indexs'
import Datum from '@/components/index/Datum'
import Activity from '@/components/index/activity'
import Service from '@/components/index/service'
import Yesbrand from '@/components/index/Yesbrand'
import Search from '@/components/index/Search'
import Identity from '@/components/index/identitycard'
import Bankcard from '@/components/index/bankcard'
import Plan from '@/components/Plan'
import Questions from '@/components/index/questions'   //常见问题
import About from '@/components/index/about'   //关于我们
import Guide from '@/components/index/guide'   //理赔指南
import Process from '@/components/index/process'   //投保流程
//personal
import Personal from '@/components/information/personal'
import Message from '@/components/information/message'
import Altertel from '@/components/information/altertel'
import ApplyModify from '@/components/information/applyModify'
import CardModfy from '@/components/information/cardModfy'
import Account from '@/components/information/account'
import Billist from '@/components/information/bilList'
import repaymentBill from '@/components/information/repaymentBill'
import loanContract from '@/components/information/loanContract'
import prepayment from '@/components/information/prepayment'
import Myloan from '@/components/information/myloan'
import Inviter from '@/components/information/inviter'
import News from '@/components/information/news'
import myQcode from '@/components/information/myQcode'
import inviteRecode from '@/components/information/inviteRecode'
//login
import Login from '@/components/logins/login'
import Login2 from '@/components/logins/login2'
import ForgetPasw from '@/components/logins/forgetPasw'
import Register from '@/components/logins/register'
//Price
import atPrice from '@/components/prices/atPrice'
import noPrice from '@/components/prices/noPrice'
import companySelect from '@/components/prices/companySelect'
import securityList from '@/components/prices/securityList'
import installmentInfo from '@/components/prices/installmentInfo'
import checkIdInfo from '@/components/prices/signContract'
import installmentSuccess from '@/components/prices/installmentSuccess'
//order
import order from '@/components/order/index'
import orderDetail from '@/components/order/orderDetail'
import orderComplete from '@/components/order/orderComplete'
//提示页面
import tipPage from '@/components/widget/tipPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: require('@/components/prices/index')
    },
    //首页
    {
      path: '/',    //首页
      name: 'Indexs',
      meta: {
        title: '首页'
      },
      component: Indexs
    },
    {
      path: '/datum',  //投保人信息
      name: 'Datum',
      meta: {
        title: '佰仟车险 '
      },
      component: Datum
    },
    {
      path: '/activity',   //活动
      name: 'Activity',
      meta: {
        title: '活动'
      },
      component: Activity
    },
    {
      path: '/service',   //服务条款
      name: 'Service',
      meta: {
        title: '服务条款'
      },
      component: Service
    },
    {
      path: '/yesbrand',   //车辆信息保存
      name: 'Yesbrand',
      meta: {
        title: '佰仟车险'
      },
      component: Yesbrand
    },
    {
      path: '/search',  //搜索
      name: 'Search',
      meta: {
        title: '搜索'
      },
      component: Search
    },
    {
      path: '/identity',//校验身份证   添加
      name: 'Identity',
      meta: {
        title: '校验身份证'
      },
      component: Identity
    },
    {
      path: '/bankcard',//银行卡校验   添加
      name: 'Bankcard',
      meta: {
        title: '银行卡校验'
      },
      component: Bankcard
    },
    {
      path: '/plan',       //险种选择
      name: 'Plan',
      meta: {
        title: '险种选择'
      },
      component: Plan
    },
    {
      path: '/questions',       //常见问题
      name: 'Questions',
      meta: {
        title: '常见问题'
      },
      component: Questions
    },
    {
      path: '/about',       //关于我们
      name: 'About',
      meta: {
        title: '关于我们'
      },
      component: About
    },
    {
      path: '/guide',       //理赔指南
      name: 'Guide',
      meta: {
        title: '理赔指南'
      },
      component: Guide
    },
    {
      path: '/process',       //投保流程
      name: 'Process',
      meta: {
        title: '投保流程'
      },
      component: Process
    },
    //我的
    {
      path: '/personal',     //个人中心
      name: 'Personal',
      meta: {
        title: '个人中心'
      },
      component: Personal
    },
    {
      path: '/message',    //我的信息 头像信息
      name: 'Message',
      meta: {
        title: '我的信息'
      },
      component: Message
    },
    {
      path: '/altertel',    //修改电话号码
      name: 'Altertel',
      meta: {
        title: '修改电话号码'
      },
      component: Altertel
    },
    {
      path: '/applyModify',    //检验身份
      name: 'ApplyModify',
      meta: {
        title: '检验身份'
      },
      component: ApplyModify
    },
    {
      path: '/cardModfy',    //银行卡变更
      name: 'CardModfy',
      meta: {
        title: '银行卡变更'
      },
      component: CardModfy
    },
    {
      path: '/account',   //还款账号  申请修改
      name: 'Account',
      meta: {
        title: '还款账号'
      },
      component: Account
    },
    {
      path: '/billist',   //我的账单
      name: 'Billist',
      meta: {
        title: '我的账单'
      },
      component: Billist
    },
    {
      path: '/repaymentBill',  //还款账单
      name: 'repaymentBill',
      meta: {
        title: '还款账单'
      },
      component: repaymentBill
    },
    {
      path: '/loanContract',   //贷款合同
      name: 'loanContract',
      meta: {
        title: '贷款合同'
      },
      component: loanContract
    },
    {
      path: '/prepayment',   //提前还款
      name: 'prepayment',
      meta: {
        title: '提前还款'
      },
      component: prepayment
    },
    {
      path: '/myloan',  //我的贷款  列表
      name: 'Myloan',
      meta: {
        title: '我的贷款'
      },
      component: Myloan
    },
    {
      path: '/inviter',   ///邀请人
      name: 'Inviter',
      meta: {
        title: '邀请人'
      },
      component: Inviter
    },
    {
      path: '/news',    //我的消息
      name: 'News',
      meta: {
        title: '我的消息'
      },
      component: News
    },
    //登录
    {
      path: '/login',    //登录
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/login2',    ///快捷登录
      name: 'Login2',
      meta: {
        title: '快捷登录'
      },
      component: Login2
    },
    {
      path: '/forgetPasw',    //忘记密码
      name: 'ForgetPasw',
      meta: {
        title: '忘记密码'
      },
      component: ForgetPasw
    },
    {
      path: '/register',    //注册新用户
      name: 'Register',
      meta: {
        title: '注册新用户'
      },
      component: Register
    },
    //报价
    {
      path: '/atPrice',    //正在报价
      name: 'atPrice',
      meta: {
        title: '正在报价'
      },
      component: atPrice
    },
    {
      path: '/noPrice',   //无法报价
      name: 'noPrice',
      meta: {
        title: '无法报价'
      },
      component: noPrice
    },
    {
      path: '/companySelect',    //车险报价
      name: 'companySelect',
      meta: {
        title: '车险报价'
      },
      component: companySelect
    },
    {
      path: '/securityList',    //车险报价
      name: 'securityList',
      meta: {
        title: '车险报价'
      },
      component: securityList
    },
    {
      path: '/installmentInfo',   //分期信息
      name: 'installmentInfo',
      meta: {
        title: '分期信息'
      },
      component: installmentInfo
    },
    {
      path: '/signContract',    //签订合同
      name: 'signContract',
      meta: {
        title: '签订合同'
      },
      component: checkIdInfo
    },
    {
      path: '/installmentSuccess',    //分期成功
      name: 'installmentSuccess',
      meta: {
        title: '分期成功'
      },
      component: installmentSuccess
    },
    //订单
    {
      path: '/order',       //全部订单
      name: 'order',
      meta: {
        title: '全部订单'
      },
      component: order
    },
    {
      path: '/orderDetail',    //待支付投保订单详情
      name: 'orderDetail',
      meta: {
        title: '待支付投保订单详情'
      },
      component: orderDetail
    },
    {
      path: '/orderComplete',      //已投保投保订单详情
      name: 'orderComplete',
      meta: {
        title: '已投保投保订单详情'
      },
      component: orderComplete
    },
    {
      path: '/myQcode',    //我的二维码
      name: 'myQcode',
      meta: {
        title: '我的二维码'
      },
      component: myQcode
    },
    {
      path: '/inviteRecode',    //邀请记录 列表
      name: 'inviteRecode',
      meta: {
        title: '邀请记录'
      },
      component: inviteRecode
    },
    {
      path: '/tipPage',    //提示信息
      name: 'tipPage',
      meta: {
        title: '提示信息'
      },
      component: tipPage
    }

  ]
})
