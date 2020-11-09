<template>
  <!-- 我已卖出页 -->
  <div class="soldContert">
    <!-- 头部 -->
    <div class="header">
      <div class="myBuyIcon" @click="toMy">
        <div class="iconfont">&#xe614;</div>
      </div>
      <div class="myBuyName">我已卖出</div>
    </div>
    <div class="existingContert">
      <div class="lineItem" v-for="(item,index) in orderList" :key="index">
        <!-- 上半部分 -->
        <div class="imgLineItem">
          <!-- 图片 -->
          <div class="img" @click="toDetails(item.id)">
            <img :src="item.avatar" width="100%" alt />
          </div>
          <div class="caption">
            <div class="captionTex">{{item.title}}</div>
            <div class="captionNum">
              <div class="onceBuy">单次购买</div>
              <div class="sum">¥{{item.product_money}}</div>
            </div>
          </div>
        </div>
        <!-- 下半部分 -->
        <div class="orderLineItem">
          <div class="serialNum">
            <div class="serialTex">购买者</div>
            <div class="serialnum">{{item.nickname}}</div>
          </div>
          <div class="buyTime">
            <div class="timeTex">购买时间</div>
            <div class="timeNum">{{item.create_time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import request from "../../utils/req";

export default {
  name: "",
  data() {
    return {
      orderList: [],
    };
  },
  created() {
    this.orderInfo();
  },
  methods: {
    // 获取数据
    orderInfo() {
      request(
        "/product/orderInfo",
        {
          type: "2",
        },
        (res) => {
          console.log(res);
          this.orderList = res.data.info;
        }
      );
    },
    toMy(){
      this.$router.push({ path: `/my` });
    },
    toDetails(id){
      this.$router.push({ path: `/ImageDetails/${id}`});
    }
  },
};
</script>
 
<style scoped >
@import url("./index.css");
</style>