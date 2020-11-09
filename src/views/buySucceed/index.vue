<template>
<!-- 购买成功 页面 -->
 <div class="buyContert">
     <div class="header">
         <router-link to="/index">
         <div class="searchIcon iconfont">&#xe60e;</div>
        </router-link>
        <div class="buyName">购买成功</div>
     </div>
     <!-- 购买成功信息 -->
     <div class="PaySInfor">
         <div class="payImg"></div>
         <div class="payName">购买成功</div>
         <div class="payDetails">您已成功购买“巴黎圣母院高清摄影图可到我购物里查看</div>
     </div>
     <!-- 支付成功单号 -->
     <div class="sumOdd">
         <div class="sum">
             <div class="sumTex">支付金额</div>
             <div class="sumNum">¥140.00</div>
         </div>
         <div class="Odd">
             <div class="oddTex">订单编号</div>
             <div class="oddNum">092915487923166</div>
         </div>
     </div>
     <!-- 下载到本地 -->
     <div class="download">下载到本地</div>
     <!-- 复制下载链接 -->
     <div class="copyLink">复制下载链接</div>
     <!-- 弹框 -->
     <div class="popUpflex">
     <div class="popUp">已复制到剪贴版</div>

     </div>
 </div>
</template>
 
<script>
export default {
 name: '',
data () {
    return {
    }
}
}
</script>
 
<style scoped >
    @import url('./index.css');
</style>