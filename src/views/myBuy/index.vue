<template>
  <!-- 我的购买页面 -->
  <div class="myBuyContert">
    <!-- 头部 -->
    <div class="header">
      <div class="myBuyIcon" @click="toMy">
        <div class="iconfont">&#xe614;</div>
      </div>
      <div class="myBuyName">我已购买</div>
    </div>
    <div class="main">
      <!-- 我的购买子页面 有数据 -->
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
              <div class="serialTex">订单编号</div>
              <div class="serialnum">{{item.order_no}}</div>
            </div>
            <div class="buyTime">
              <div class="timeTex">购买时间</div>
              <div class="timeNum">{{item.create_time}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 我的购买子页面 无数据 -->
      <div class="withoutContert" v-show="isShow">
        <div class="withoutImg">
          <div class="buyimg">
            <img
              class="buyImg"
              src="../../assets/image/qweqwe.png"
              alt
              width="110px"
              height="100px"
            />
          </div>
          <div class="buyTex">暂时没有购买记录</div>
          <div class="buyBat">去购买</div>
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
      isShow: false,
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
          type: "1",
        },
        (res) => {
          console.log(res);
          this.orderList = res.data.info;
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].length < 0) {
              this.isShow = true;
            }
          }
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
 
<style scoped lang ='less'>
@import url("./index.css");
.existingContert {
  width: 100%;
  height: 100vh;
  background: #f8f9fa;
  padding-top: 0.5rem;

  .lineItem {
    width: 17.25rem;
    height: 10.05rem;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    padding-top: 0.5rem;
    box-sizing: border-box;
    background-color: #fff;
    /* // 上半部分 */
    .imgLineItem {
      width: 16.25rem;
      height: 5.75rem;
      margin: 0 auto;
      border-bottom: 1px solid #f2f2f2;
      display: flex;

      /* // 左边图片 */
      .img {
        width: 5rem;
        height: 5rem;
        background-color: gold;
        margin-right: 0.5rem;
      }

      /* // 右边 */
      .caption {
        width: 10.75rem;
        height: 5rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .captionTex {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 1.1rem;
        }

        .captionNum {
          display: flex;

          .onceBuy {
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 0.9rem;
          }

          .sum {
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #cf1322;
            line-height: 0.9rem;
            margin-left: auto;
          }
        }
      }
    }
    /* // 下半部分 */
    .orderLineItem {
      width: 16.25rem;
      height: 3.75rem;
      margin: 0 auto;
      /* // 订单 */
      .serialNum {
        display: flex;
        margin-bottom: 0.5rem;
        margin-top: 0.7rem;
        .serialTex {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 18px;
          flex-wrap: wrap;
          margin-right: 1rem;
        }

        .serialnum {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 18px;
        }
      }
      /* // 时间 */
      .buyTime {
        display: flex;
        .timeTex {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 18px;
          flex-wrap: wrap;
          margin-right: 1rem;
        }
        .timeNum {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 18px;
        }
      }
    }
  }

  .lineItem:last-child {
    margin-bottom: 0;
  }
}
.myBuyContert {
  margin-top: 2.5rem;
  .header {
    width: 100%;
    height: 2.5rem;
    position: relative;
    text-align: center;
    position: fixed;
    top: 0;
    background-color: #fff;

    .myBuyIcon {
      width: 0.8rem;
      height: 0.8rem;
      font-size: 0.8rem;
      font-family: "微软雅黑", "黑体", "宋体";
      font-weight: bold;
      line-height: 2.5rem;
      position: absolute;
      left: 0.75rem;
      top: 0;
    }

    .myBuyName {
      // width: 3.3rem;
      // margin: 0 auto;
      font-size: 0.8rem;
      font-family: "微软雅黑", "黑体", "宋体";
      font-weight: bold;
      line-height: 2.5rem;
    }
  }
}
</style>