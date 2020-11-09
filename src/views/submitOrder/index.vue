<template>
  <!-- 单次购买页面 -->
  <div class="orderContert">
    <!-- 头部 -->
    <div class="header">
      <div class="orderIcon iconfont" @click="toDetails(id)">&#xe614;</div>
      <div class="orderName">提交订单</div>
    </div>
    <div class="orderMain">
      <!-- 商品详情 价格-->
      <div class="orderBlurb">
        <div class="orderImg">
          <img :src="imgList[0]" alt width="100%" />
        </div>
        <div class="orderTxt">
          <div class="caption">{{detailList.title}}</div>
          <div class="price">¥{{detailList.product_money}}</div>
        </div>
      </div>
      <!-- 说明 -->
      <div class="explain">
        <div class="paymentWay">
          <div class="way">付费方式</div>
          <div class="Single">单次购买</div>
        </div>
        <div class="spExplain">
          <div class="exp">购买说明</div>
          <div class="Exp">单次购买后只能下载一次，如有需要再次购买需要再次购买需要再次购买</div>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="payWay">
        <div class="payway">支付方式</div>
        <div class="weiXin">
          <div class="weixinLogo iconfont">&#xe60c;</div>
          <div class="weixinTxt">微信支付</div>
        </div>
      </div>
      <!-- 确认支付 -->
      <div class="affirm">确认支付</div>
    </div>
  </div>
</template>
 
<script>
import request from "../../utils/req";

export default {
  props: {
    id: String,
  },
  name: "",
  data() {
    return {
      detailList: [],
      imgList: [],
    };
  },
  created() {
    this.indexList();
  },
  methods: {
    indexList() {
      console.log(this.id);
      request(
        "product/getDetail",
        {
          pid: this.id,
        },
        (res) => {
          console.log(res);
          this.detailList = res.data;
          this.imgList = res.data.product_img_vedio;
        }
      );
    },
    toDetails(id){
        console.log(id);
        this.$router.push({ path: `/ImageDetails/${id}` })
    }
  },
};
</script>
 
<style scoped >
@import url("./index.css");
</style>