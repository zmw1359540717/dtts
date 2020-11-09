<template>
  <div class="userList">
    <div class="users" v-for="(item,index) in imgList" :key="item.id">
      <div class="userImgList" @click.prevent="toDetail(item.id)">
        <img v-if="item.uptype !== 2" :src="item.product_img_vedio[0]" class="userImg" />
        <video class="userImg" v-else :src="item.product_img_vedio[0]" />
        <!-- 视频播放 -->
        <div class="playIcon" v-show="item.uptype == 2">
          <img class="playImg" src="../../assets/image/bofang.svg" alt />
        </div>
      </div>
      <!-- 详情 -->
      <div class="userDet">
        <div class="price">¥{{ item.product_money }}</div>
        <div class="userHead">{{item.title}}</div>
        <div class="user">
          <div class="userPor">
            <span class="userPortrait">
              <img :src="item.avatar" width="100%" height="100%" alt />
            </span>
            <span class="userName">{{item.nickname}}</span>
          </div>
          <div class="dianZan">
            <span
              class="iconfont"
              :class="[item.is_zan === 0 ? 'hongXin' : 'hongXin-bgc']"
              @click.stop="hongXin_1(item.id,item.is_zan,index)"
            >&#xe663;</span>
            <span class="give">{{item.zan}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <van-loading type="spinner" class="loading"/> -->
  </div>
</template>
 
<script>
import request from "../../utils/req";

export default {
  props: {
    imgList: {
      type: Array,
    },
  },
  name: "",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    console.log(this.imgList);
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    hongXin_1(pid, state, index) {
      console.log(pid, state);

      switch (state) {
        case 0: // 之前没有点赞，现在要去点赞
          request(
            "/product/zan",
            {
              pid: pid,
              state: 1,
            },
            (res) => {
              if (res.status === 200) {
                console.log(res);
                this.imgList[index].is_zan = 1;
                this.imgList[index].zan = Number(this.imgList[index].zan + 1);
              }
            }
          );

          break;
        case 1: // 之前点过赞，现在取消点赞
          request(
            "/product/zan",
            {
              pid: pid,
              state: 0,
            },
            (res) => {
              if (res.status === 200) {
                console.log(res);

                this.imgList[index].is_zan = 0;
                this.imgList[index].zan = Number(this.imgList[index].zan - 1);
              }
            }
          );

          break;
        default:
          break;
      }
    },
    // 去详情
    toDetail(id) {
      console.log("111");
      this.$router.push({ path: `/ImageDetails/${id}` });
    },
  },
};
</script>
 
<style scoped lang = 'less'>
@import url("./index.css");
.loading {
  margin: 0 auto;
}
</style>