<template>
  <!-- 图片详情页 -->
  <div>
    <div class="imageContert">
      <div class="header">
        <div class="imgIcon" @click="toIndex">
          <div class="iconfont">&#xe614;</div>
        </div>
        <div class="imageName">图片详情</div>
      </div>
      <div class="imageMian">
        <!-- 图片 -->
        <!-- <div class="imgList" v-show="detailList.uptype === 1"> -->
        <van-swipe @change="onChange" class="imgList" v-show="detailList.uptype === 1">
          <van-swipe-item v-for="(it,index) in imgList" :key="index">
            <img :src="it" alt width="100%" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator astrict">{{ current + 1 }}/{{detailList.resource_nums}}</div>
          </template>
        </van-swipe>
        <!-- </div> -->
        <!-- 视频 -->
        <div v-if="!isPlaying" class="cover_image" v-show="detailList.uptype === 2">
          <video :src="imgList[0]" width="100%" class="video" alt />
          <div class="play">
            <img @click="isPlaying=true" src="../../assets/image/bofang.svg" alt />
          </div>
        </div>
        <div v-else class="course_video" v-show="detailList.uptype === 2">
          <video :src="imgList" width="100%" autoplay controls></video>
        </div>
        <!-- 标题部分 -->
        <div class="headline">
          <div class="headlineBox">
            <div class="headlineTex">{{detailList.title}}</div>
            <div class="price">¥{{detailList.product_money}}</div>
          </div>
          <div class="giveLike">
            <!-- <div class="giveLikeIcon">
              <img
                :src="[detailList.is_zan === 1 ? '../../assets/image/zan.png' : '../../assets/image/zan.png']"
                @click="likeOrUnLike(detailList.is_zan,detailList.id)"
                width="30"
                alt
              />
            </div>-->
            <div class="dianZan">
              <span
                class="iconfont"
                :class="[detailList.is_zan === 0  ? 'hongXin' : 'hongXin-bgc']"
                @click="likeOrUnLike(detailList.is_zan,detailList.id)"
              >&#xe663;</span>
            </div>
            <div class="giveLikeNum">{{detailList.zan}}</div>
          </div>
        </div>
        <div class="tabsList">
          <div
            class="tabsBox"
            v-for="(item,index) in detailList.product_label_title"
            :key="index"
          >{{item}}</div>
        </div>
        <!-- 上传时间 -->
        <div class="uploadTime">上传于{{ detailList.create_time}}</div>
        <!-- 介绍 -->
        <div class="introduce">{{detailList.product_content}}</div>
        <!-- 用户列表 -->
        <div class="imgUserList" @click.prevent="toUserPage(detailList.id)">
          <div class="head">
            <img :src="detailList.avatar" width="100%" alt />
          </div>
          <div class="name">{{detailList.nickname}}</div>
          <div class="jiantou iconfont">&#xe604;</div>
        </div>
      </div>
    </div>
    <!-- 底部购买 -->
    <div class="botBuy">
      <div class="share" @click="showCont">
        <div class="shareIcon">
          <img src="../../assets/image/fenxiang.svg" height="100%" width="100%" alt />
        </div>
        <div class="shareTex">分享</div>
      </div>
      <!-- 购买前 -->
      <div class="onShow">
        <div class="danCiBuy" @click="toSubmit(detailList.id)">
          <div class="danCiOrder">¥{{detailList.product_money}}</div>
          <div class="onceTex">单次购买</div>
        </div>
        <div class="copyright" @click="toCopy(detailList.id)">
          <div class="copyrightOrder">¥{{detailList.product_allmoney}}</div>
          <div class="copyrightTex">购买版权</div>
        </div>
      </div>
      <!-- 购买后 -->
      <!-- <div class="yetBuu">您已购买版权，点击下载</div> -->
      <!-- <div class="xiaZan">
        <div class="xiaZanL">
          <div class="download">下载到本地</div>
        </div>
        <div class="xiaZanR" @click="copyLink">
          <div class="copylink">复制下载链接</div>
        </div>
      </div> -->
    </div>
    <!-- 分享弹窗 -->
    <div class="sharePop" v-show="seen">
      <div class="fenXiang">快分享给朋友吧～</div>
      <div class="approach">
        <div class="link">
          <div class="linkIcon">
            <img src="../../assets/image/lianjie.svg" alt />
          </div>
          <div class="linkTex">复制链接</div>
        </div>
        <div class="wXfriend">
          <div class="wXfriendIcon">
            <img src="../../assets/image/weixin.svg" alt />
          </div>
          <div class="wXfriendTex">微信好友</div>
        </div>
        <div class="palS">
          <div class="palSIcon">
            <img src="../../assets/image/pengyouquan.svg" alt />
          </div>
          <div class="palSTex">朋友圈</div>
        </div>
      </div>
      <div class="off" @click="showCont">×</div>
    </div>
  </div>
</template>
 
<script>
import request from "../../utils/req";

export default {
  props: {
    id: String,
  },
  name: "",
  data() {
    return {
      seen: false, //弹窗
      detailList: [], //列表数据
      imgList: [], //图片
      isPlaying: false, // 是否正在播放
      current: 0, //轮播图索引
    };
  },
  created() {
    this.indexList();
  },
  methods: {
    // copyLink() {
    //   request("product/getMediaUrl", {}, (res) => {
    //     console.log(res,"21313");
    //     if (res.status == 200) {
    //         console.log(res);
    //       // this.$toast('复制成功');
    //     }
    //   });
    // },
    onChange(index) {
      this.current = index;
    },
    // 弹窗
    showCont() {
      this.seen = !this.seen;
    },
    //列表数据
    indexList() {
      request(
        "product/getDetail",
        {
          pid: this.id,
        },
        (res) => {
          console.log(res);
          this.detailList = res.data;
          this.imgList = res.data.product_img_vedio;
          console.log(this.detailList.is_zan);
        }
      );
    },
    // 点赞与取消点赞
    likeOrUnLike(zan, id) {
      // console.log(item)
      switch (zan) {
        // 之前没有点赞，现在点赞
        case 0:
          request(
            "/product/zan",
            {
              pid: id,
              state: 1,
            },
            (res) => {
              console.log(res);
              if (res.status === 200) {
                this.detailList.is_zan = 1;
                this.detailList.zan = Number(this.detailList.zan + 1);
              }
            }
          );

          break;

        case 1:
          request(
            "/product/zan",
            {
              pid: id,
              state: 0,
            },
            (res) => {
              console.log(res);
              if (res.status === 200) {
                this.detailList.is_zan = 0;
                this.detailList.zan = Number(this.detailList.zan - 1);
              }
            }
          );

          break;

        default:
          break;
      }
    },

    // 去用户详情页
    toUserPage(id) {
      this.$router.push({ path: `/userPage/${id}` });
    },
    // 去单次购买
    toSubmit(id) {
      this.$router.push({ path: `/submitOrder/${id}` });
    },
    // 去购买版权
    toCopy(id) {
      this.$router.push({ path: `/buyCopyright/${id}` });
    },
    // 去首页
    toIndex() {
      this.$router.push({ path: `/index` });
    },
  },
};
</script>
 
<style scoped lang = 'less'>
@import url("./index.css");
</style>