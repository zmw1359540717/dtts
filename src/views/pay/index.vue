<template>
<!-- 支付页 -->
 <div class="payContert">
     <div class="header">
          <router-link class="tuiChu iconfont" to="/my">&#xe614;
          </router-link>
          <div class="headLine">立即支付</div>
      </div>
      <div class="money">
          <div class="dtts">道听图说</div>
          <div class="sum">¥25.00</div>
      </div>
      <div class="payee">
          <div class="payeeTex">收款方</div>
          <div class="firm">商企云算科技</div>
      </div>
      <div class="payBat">确认支付</div>
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