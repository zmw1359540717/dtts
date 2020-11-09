<template>
  <!-- 我的 页面 -->
  <div class="myContert">
    <!-- 头部 -->
    <div class="header">我的</div>
    <!-- 头像 -->
    <div class="userMessage">
      <router-link to="/userDatum">
        <div class="headPortrait"><img :src="myList.avatar" style="width:100%; height:100%; border-radius:50%;" alt=""></div>
      </router-link>
      <div class="userName">{{myList.nickname}}</div>
    </div>
    <!-- // 获赞 / 可提现金额 -->
    <div class="praiseSum">
      <div class="praise">
        <div class="praiseNum">{{myList.zan}}</div>
        <div class="praiseTex">获赞</div>
      </div>
      <div class="shuGang"></div>
      <div class="sum">
        <div class="sumNum">¥{{myList.amount}}</div>
        <div class="sunName">可提现</div>
      </div>
    </div>
    <div class="hengGang"></div>
    <!-- 列表 -->
    <div @click="toUserPage()" class="myList">
      <div class="myListIcon iconfont">&#xe618;</div>
      <div class="myListName">我的作品</div>
      <div class="jiantou iconfont">&#xe604;</div>
    </div>
    <router-link to="/myWallet" class="myList">
      <div class="myListIcon iconfont">&#xe612;</div>
      <div class="myListName">我的钱包</div>
      <div class="jiantou iconfont">&#xe604;</div>
    </router-link>
    <router-link to="/myBuy" class="myList">
      <div class="myListIcon iconfont">&#xe619;</div>
      <div class="myListName">我的购买</div>
      <div class="jiantou iconfont">&#xe604;</div>
    </router-link>
    <router-link to="/mySold" class="myList">
      <div class="myListIcon iconfont">&#xe60d;</div>
      <div class="myListName">我的卖出</div>
      <div class="jiantou iconfont">&#xe604;</div>
    </router-link>
    <router-link to="/giveLike" class="myList">
      <div class="myListIcon iconfont">&#xe608;</div>
      <div class="myListName">我已点赞</div>
      <div class="jiantou iconfont">&#xe604;</div>
    </router-link>
  </div>
</template>
 
<script>
import request from "../../utils/req";

export default {
  name: "",
  data() {
    return {
      myList:'',
      id:1
    };
  },
  created() {
    this.owninfo()
  },
  methods: {
    // 获取数据
    owninfo(){
      request(
        "/product/owninfo",
        {
        },
        (res) => {
          console.log(res);
          this.myList = res.data
          console.log(this.myList);
        }
      );
    },
    toUserPage(){
      this.$router.push({ path: `/myUpload` });

    }
  },
};
</script>
 
<style scoped >
@import url("./index.css");
</style>