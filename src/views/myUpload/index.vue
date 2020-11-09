<template>
  <div class="myUpload">
    <div class="header">
      <router-link to="/my">
        <div class="zuojiantou iconfont">&#xe614;</div>
      </router-link>
      <div class="headline">我的上传</div>
    </div>
    <div class="tabHeader">
      <div class="tabBarTop">
        <div class="imgName" :class="[uptype == 1 ? 'active' : '']" @click="selectedImg(1)">图片</div>
        <div class="videoName" :class="[uptype == 2? 'active' : '']" @click="selecTed(2)">视频</div>
      </div>
      <div class="tabBar">
        <div class="tabBarbot">
          <div class="putaway" :class="[uptypeRgb == 0 ? 'active' : '']" @click="soldState()">全部</div>
          <div
            class="yetPutaway"
            :class="[uptypeRgb == 1 ? 'active' : '']"
            @click="soldState_1()"
          >已上架</div>
          <div class="soldOut" :class="[uptypeRgb == 2 ? 'active' : '']" @click="soldState_2()">已下架</div>
        </div>
      </div>
    </div>

    <router-view></router-view>
    <div class="listBox">
      <List :imgList="imgList" />
    </div>
    <!-- 相机Icon -->
    <router-link to="/issue/1">
      <div class="camera">
        <img src="../../assets/image/xiangji.png" width="50px" alt />
      </div>
    </router-link>
  </div>
</template>
 
<script>
import List from "../../components/List/index";
import request from "../../utils/req";
export default {
  name: "",
  data() {
    return {
      imgList: [], //列表
      imgUp: 1, //图片
      video: 1, //视频
      status: 2,
      uptype: "",
      uptypeRgb: "",
    };
  },
  components: {
    List,
  },
  created() {
    this.selectedImg(1);
  },
  methods: {
    // 图片
    selectedImg(type) {
      this.video = type;
      request(
        "/product/myProducts",
        {
          uptype: type,
          status: this.status,
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
    selecTed(type) {
      this.video = type;
      request(
        "/product/myProducts",
        {
          uptype: this.video,
          status: this.status,
        },
        (res) => {
          if (res.status == 200) {
            this.imgList = res.data.info;
            this.uptype = 2;
          }
        }
      );
    },
    // 全部
    soldState() {
      var sta = (this.status = 2);
      console.log(sta);
      request(
        "/product/myProducts",
        {
          uptype: this.video,
          // uptype: this.video,
          status: sta,
        },
        (res) => {
          if (res.status == 200) {
            this.imgList = res.data.info;
            this.uptypeRgb = 0;
          }
        }
      );
    },
    // 上架
    soldState_1() {
      var sta = (this.status = 1);
      console.log(sta);
      request(
        "/product/myProducts",
        {
          uptype: this.video,
          // uptype: this.video,
          status: sta,
        },
        (res) => {
          if (res.status == 200) {
            this.imgList = res.data.info;
            this.uptypeRgb = 1;
          }
        }
      );
    },
    // 下架
    soldState_2() {
      var sta = (this.status = 0);
      request(
        "/product/myProducts",
        {
          uptype: this.video,
          // uptype: this.video,
          status: sta,
        },
        (res) => {
          console.log(res);
          if (res.status == 200) {
            this.imgList = res.data.info;
            this.uptypeRgb = 2;
          }
        }
      );
    },
  },
};
</script>
 
<style scoped >
@import url("./index.css");
</style>