<template>
  <!-- 我的钱包页 -->
  <div class="walletContert">
    <div class="header">
      <div class="tuiChu" @click="toMy">
        <div class="iconfont">&#xe614;</div>
      </div>
      <div class="headLine">我的钱包</div>
    </div>
    <!-- 余额 -->
    <div class="walletMain">
      <div class="balance">
        <div class="balanceNum">{{ amount }}</div>
        <div class="balanceTex">
          <div class="bTex">可提现余额</div>
          <van-icon name="info-o" color="#fff" size="18" @click="show = true" />
        </div>
        <div class="balanceBat">立即提现</div>
      </div>
    </div>
    <!-- 昨日详情 -->
    <div class="yesterDay">
      <!-- 收益 -->
      <div class="earnings">
        <div class="yDay">昨日收益(元)</div>
        <div class="money">{{ yes_money }}</div>
        <div class="addUp">累计收益(元)</div>
        <div class="addMoney">{{ all_money }}</div>
      </div>
      <!-- 订单量 -->
      <div class="orderSize">
        <div class="yDay">昨日订单量(个)</div>
        <div class="money">{{ yes_count }}</div>
        <div class="addUp">累计订单量(个)</div>
        <div class="addMoney">{{ all_count }}</div>
      </div>
    </div>
    <!-- 提现 -->
    <div class="withdraw">
      <div class="record">提现记录</div>
      <div class="recordList" v-for="(item,index) in walletList" :key="index">
        <div class="withdrawNum">
          <div class="withdrawTex">提现{{item.amount}}元</div>
          <div class="succeed">{{item.status}}</div>
        </div>
        <div class="balanceNum">
          <div class="balanceTex">余额：{{ item.balance }}元</div>
          <div class="balanceTime">{{ item.amount_time }}</div>
        </div>
      </div>
    </div>
    <!-- 提示框 -->
    <van-overlay :show="show" class="overlay" @click="isShow">
      <div class="wrapper">
        <div class="block">
          <div class="title">提示规则</div>
          <p class="rule">1.提现规则提现规则提现规则提现规则提现规则</p>
          <p class="rule">2.提现规则提现规则提现规则提现规则提现规则</p>

          <p class="rule">3.提现规则提现规则提现规则提现规则提现规则</p>

        </div>
      </div>
    </van-overlay>
  </div>
</template>
 
<script>
import request from "../../utils/req";

export default {
  name: "",
  data() {
    return {
      walletList: [],
      all_count: "",
      all_money: "",
      yes_count: "",
      yes_money: "",
      amount: "",
      show: false,
    };
  },
  created() {
    this.myBag();
  },
  methods: {
    myBag() {
      request("/product/myBag", {}, (res) => {
        if (res.status == 200) {
          console.log(res);
          for (let i = 0; i < res.data.amount_log.length; i++) {
            switch (res.data.amount_log[i].status) {
              case 0:
                res.data.amount_log[i].status = "审核中";
                break;
              case 1:
                res.data.amount_log[i].status = "提现成功";
                break;
              case 2:
                res.data.amount_log[i].status = "驳回";
                break;
              default:
                break;
            }
          }
          this.walletList = res.data.amount_log;
          this.amount = res.data.amount;
          this.all_count = res.data.all_count;
          this.all_money = res.data.all_money;
          this.yes_count = res.data.yes_count;
          this.yes_money = res.data.yes_money;
        }
      });
    },
    toMy() {
      this.$router.push({ path: `/my` });
    },
    isShow() {
      console.log("000");
      this.show = false;
    },
  },
};
</script>
 
<style scoped >
@import url("./index.css");

</style>