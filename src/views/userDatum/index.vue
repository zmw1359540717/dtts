<template>
  <!-- 个人资料页 -->
  <div class="userContert">
    <div class="header">
      <router-link to="/my">
        <div class="zuojiantou iconfont">&#xe614;</div>
      </router-link>
      <div class="headline">个人资料</div>
    </div>
    <!-- 头像 -->
    <div class="userMessage">
      <div class="headPortrait">
        <div class="headPortrait">
          <img :src="myList.avatar" style="width:100%; height:100%; border-radius:50%;" alt />
        </div>
      </div>
    </div>
    <!-- 资料列表 -->
    <div class="datumList">
      <div class="typeList">昵称</div>
      <div class="ListName">{{myList.nickname}}</div>
    </div>
    <div class="datumList">
      <div class="typeList">性别</div>
      <div class="ListName">{{myList.gender==1 ? '男' : "女"}}</div>
    </div>
    <div class="datumList">
      <div class="typeList">地区</div>
      <div class="ListName">{{myList.province}},{{myList.city }}</div>
    </div>
  </div>
</template>
 
<script>
import request from "../../utils/req";
export default {
  name: "",
  data() {
    return {
      myList: [],
    };
  },
  created() {
    this.owninfo();
  },
  methods: {
    // 获取数据
    owninfo() {
      request("/product/owninfo", {}, (res) => {
        console.log(res);
        this.myList = res.data;
      });
    },
  },
};
</script>
 
<style scoped >
@import url("./index.css");
</style>