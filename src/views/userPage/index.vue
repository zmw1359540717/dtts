<template>
  <!-- 他的主页页面 -->
  <div class="userPage">
    <div class="header">
      <div class="zuojiantou"  @click="toDetails(id)">
        <div class="iconfont">&#xe614;</div>
      </div>

      <div class="headline">TA的主页</div>
    </div>
    <!-- 头像 -->
    <div class="headPortrait">
      <div class="headImg">
        <img :src="myList.avatar" width="100%" alt />
      </div>
      <div class="headName">{{myList.nickname}}</div>
      <div class="headSite">{{myList.city }}·{{myList.gender==1 ? '男' : "女"}}·{{ teacherAge }}岁</div>
    </div>
    <div class="main">
      <div class="tabBar">
        <div class="imgName" :class="[uptype == 1 ? 'active' : '']" @click="selectedImg()">图片</div>
        <div class="videoName" :class="[uptype == 2 ? 'active' : '']" @click="selecTed()">视频</div>
      </div>
    </div>
    <div class="listBox">
      <List :imgList="imgList" />
    </div>
  </div>
</template>
 
<script>
import List from "../../components/List/index";
import request from "../../utils/req";
export default {
  props: {
    id: String,
  },
  name: "",
  data() {
    return {
      imgList: [],
      // 图片 视频搜索
      imgUp: 1,
      video: 2,
      // 个人资料
      myList: "",
      teacherAge: "", //年龄
      uptype: "", //动态样式
    };
  },
  components: {
    List,
  },
  created() {
    this.selectedImg();
    this.owninfo();
  },
  methods: {
    // 通过关键字搜索
    // 图片
    selectedImg() {
      request(
        "product/myProducts",
        {
          uptype: this.imgUp,
          tid:this.id
        },
        (res) => {
          console.log(res);
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
        "product/myProducts",
        {
          uptype: this.video,
          tid:1
        },
        (res) => {
          if (res.status == 200) {
            this.imgList = res.data.info;
            this.uptype = 2;
          }
        }
      );
    },
    // 个人资料
    owninfo() {
      request("/product/owninfo", {}, (res) => {
        console.log(res);
        this.myList = res.data;
        console.log(this.myList);
        this.teacherBirthday = this.myList.birthday;
        console.log(this.teacherBirthday);
      });
    },
    // 去详情
    toDetails(id) {
      console.log(id);
      this.$router.push({ path: `/ImageDetails/${id}` });
    },
  },
};
</script>
 
<style scoped >
@import url("./index.css");
</style>