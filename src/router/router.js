import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 页面组件
import index from '../views/index/index.vue'
import my from '../views/my/index.vue'
import seek from '../views/seek/index.vue'
import tabBat from '../views/tabBat/index.vue'
// 提交订单
import submitOrder from '../views/submitOrder/index.vue'
// 图片详情
import ImageDetails from '../views/ImageDetails/index.vue'
// 购买版权
import buyCopyright from '../views/buyCopyright/index.vue'
// 购买成功
import buySucceed from '../views/buySucceed/index.vue'
// 个人资料
import userDatum from '../views/userDatum/index.vue'
// 我的购买
import myBuy from '../views/myBuy/index.vue'
// 我的钱包
import myWallet from '../views/myWallet/index.vue'
// 我的卖出
import mySold from '../views/mySold/index.vue'
// 立即支付
import pay from '../views/pay/index.vue'
// 我的上传
import myUpload from '../views/myUpload/index.vue'
// 我的上传详情
import myUploading from '../views/myUploading/index.vue'
// 发布
import issue from '../views/issue/index.vue'
// 他的主页
import userPage from '../views/userPage/index.vue'
// 我的点赞
import giveLike from '../views/giveLike/index.vue'

// 嵌套路由



const routes = [
    //   路由重定向
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/tabBat',
        component: tabBat,
        children: [
            // 首页
            {
                path: '/index',
                component: index,
            },
            // 我的
            {
                path: '/my',
                component: my
            }
        ]
    },

    // 搜索
    {
        path: '/seek',
        component: seek,
    },
    // 提交订单
    {
        path: '/submitOrder/:id',
        component: submitOrder,
        props:true,

    },
    // 图片详情
    {
        path: '/ImageDetails/:id',
        name:'ImageDetails',
        component: ImageDetails,
        props:true
    },
    // 购买版权
    {
        path: '/buyCopyright/:id',
        component: buyCopyright,
        props:true

    },
    // 购买成功
    {
        path: '/buySucceed',
        component: buySucceed
    },
    // 个人资料
    {
        path: '/userDatum',
        component: userDatum
    },
    // 我的购买
    {
        path: '/myBuy',
        component: myBuy,
    },
    // 我的钱包
    {
        path: '/myWallet',
        component: myWallet
    },
    // 我的卖出
    {
        path: '/mySold',
        component: mySold
    },
    // 立即支付
    {
        path: '/pay',
        component: pay
    },
    // 我的上传详情
    {
        path: '/myUploading',
        component: myUploading
    },
    {
        path: '/myUpload',
        component: myUpload
    },
    // 发布
    {
        path: '/issue/:id',
        component: issue,
        props:true

    },
    // 他的主页
    {
        path: '/userPage/:id',
        component: userPage,
        props:true

    },
    // 我的点赞
    {
        path: '/giveLike',
        component: giveLike,
    }
]
const router = new VueRouter({
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // }
})
export default router