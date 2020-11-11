<template>
  <!-- 首页 -->
  <div class="contert">
    <!-- 顶部 -->
    <div class="headerBox">
      <div class="header">首页</div>
    </div>
    <!-- 内容 -->
    <div
      class="infinite-list"
      infinite-scroll-delay="3000"
      v-infinite-scroll="onLoad"
      style="overflow:auto"
    >
      <div class="main">
        <!-- 搜索框 -->
        <router-link to="/seek">
          <div class="search">
            <div class="searchIcon iconfont icon-sousuo"></div>
            <input class="searchBtn" type="text" placeholder="请输入搜索内容" />
          </div>
        </router-link>
        <!-- 轮播图 -->
        <div class="slideShow">
          <van-swipe
            class="my-swipe"
            :autoplay="3000"
            style="height:150px;"
            indicator-color="white"
          >
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
              <img :src="item" alt style="width:100%; height:100%;" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- tab栏 -->
        <div class="tabNav">
          <div class="tabName">
            <div class="tabName_1" :class="[uptype == 0 ? 'active' : '']" @click="indexList()">全部</div>
            <div class="tabName_1" :class="[uptype == 1 ? 'active' : '']" @click="selectedImg()">图片</div>
            <div class="tabName_1" :class="[uptype == 2 ? 'active' : '']" @click="selecTed()">视频</div>
            <div class="tabIcon iconfont" @click="showCont">&#xe617;</div>
          </div>
        </div>
        <!-- 标签 -->
        <!-- <transition name="slide-fade"> -->
        <div class="tabsList" v-show="seen">
          <div
            class="tabsBox"
            @click="labelList(it)"
            v-for="(it,index) in tabsList"
            :key="index"
          >{{it}}</div>
        </div>
        <!-- </transition> -->

        <!-- <van-list class="infinite-list" v-infinite-scroll="onLoad" style="overflow:auto"> -->
        <van-list :finished="finished" finished-text="没有更多了">
          <List :imgList="imgList" />
        </van-list>
      </div>
    </div>
  </div>
</template>
 
<script>
import List from "../../components/List/index";
import request from "../../utils/req";
import user from "../../utils/user";

export default {
  name: "",
  data() {
    return {
      // 加载
      loading: false,
      finished: false,
      // ...
      seen: false,
      active: false,
      list: [],
      // 轮播图
      bannerList: [],
      // 标签
      tabsList: [],
      imgList: [],
      // 图片 视频搜索
      imgUp: 1,
      video: 2,
      uptype: "", //动态样式
      // 分页
      page: 1,
      pagenum: 10,
      ondata: false,
      appid: "wx2b5d345cbc7a426b",
    };
  },
  components: {
    List,
  },
  created() {
    // this.indexList();
    if (!localStorage.getItem("token") && !localStorage.getItem("openid")) {
      user.myLogin();
    } else {
      this.indexList();
    }
    // console.log(this.$router.history.current.query.code);
  },
  methods: {
    onLoad() {
      if (!localStorage.getItem("token")) {
        return;
      }
      if (this.ondata) {
        return;
      }
      this.loading = true;
      request(
        "product/getlist",
        {
          page: this.page,
          pagenum: this.pagenum,
        },
        (res) => {
          console.log(123123123123);
          this.loading = false;
          if (res.status == 200) {
            this.page += 1;
            res.data.info.map((item) => {
              this.imgList.push(item);
            });
            if (res.data.info.length <= 9) {
              this.ondata = true;
              this.loading = false;
            }
          }
        }
      );
    },
    // 标签显示影藏
    showCont() {
      this.seen = !this.seen;
    },
    // 获取列表
    indexList() {
      request(
        "product/getlist",
        {
          page: this.page,
          pagenum: this.pagenum,
        },
        (res) => {
          console.log(res);
          if (res.status == 200) {
            this.page += 1;
            this.bannerList = res.data.banner;
            this.tabsList = res.data.product_label;
            this.imgList = res.data.info;
            this.uptype = 0;
            if (res.data.info.length < 10) {
              this.ondata = true;
            }
          }
        }
      );
    },
    // 通过关键字搜索
    // 图片
    selectedImg() {
      request(
        "product/getlist",
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
        "product/getlist",
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
    // 标签搜索
    labelList(it) {
      console.log(it);
      request(
        "product/getlist",
        {
          product_type: it,
        },
        (res) => {
          this.imgList = res.data.info;
        }
      );
    },
  },
};
</script>
 
<style scoped  lang='less'>
@import url("./index.css");
// .van-swipe__indicator{
//   width: 0.5rem;
//   height: 0.5rem;
// }
.my-swipe {
  height: 164px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>