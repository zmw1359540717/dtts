<template>
  <div class="giveLike">
    <div class="header">
      <div class="zuojiantou" @click="toMy">
        <div class="iconfont">&#xe614;</div>
      </div>
      <div class="headline">我的点赞</div>
    </div>
    <div class="main">
      <div class="tabBar">
        <div class="imgName" :class="[uptype == 1 ? 'active' : '']" @click="selectedImg()">图片</div>
        <div class="videoName" :class="[uptype == 2 ? 'active' : '']" @click="selecTed()">视频</div>
      </div>
    </div>
    <router-view></router-view>
    <div class="listBox">
      <List :imgList="imgList" />
    </div>
  </div>
</template>
 
<script>
import List from "../../components/List/index";
import request from "../../utils/req";

export default {
  name: "",
  data() {
    return {
      imgList: [],
      imgUp: 1,
      video: 2,
      uptype: "",
    };
  },
  components: {
    List,
  },
  created() {
    this.selectedImg();
  },
  methods: {
    selectedImg() {
      request(
        "/product/myZanProducts",
        {
          uptype: this.imgUp,
        },
        (res) => {
          if (res.status == 200) {
            this.imgList = res.data.info;
            this.uptype = 1;
          }
        }
      );
    },
    // 视频
    selecTed() {
      request(
        "/product/myZanProducts",
        {
          uptype: this.video,
        },
        (res) => {
          if (res.status == 200) {
            this.imgList = res.data.info;
            this.uptype = 2;
          }
        }
      );
    },
    toMy(){
      this.$router.push({ path: `/my` });
    }
  },
};
</script>
 
<style scoped >
@import url("../giveLike/index.css");
</style>