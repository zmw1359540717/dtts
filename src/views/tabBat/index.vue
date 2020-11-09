<template>
  <!-- 底部tab栏页面 -->
  <div class="box">
    <router-view></router-view>
    <div class="footer">
      <div class="footerBox">
        <router-link to="/index">
          <div class="indexBar">
            <div class="indexIcon iconfont">&#xe60a;</div>
            <div class="indexName">首页</div>
          </div>
        </router-link>

        <div class="addBar">
          <div class="addIcon" @click="showPopup">+</div>
        </div>
        <router-link to="/my">
          <div class="myBar">
            <div class="myIcon iconfont">&#xe606;</div>
            <div class="myName">我的</div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- <div class="box-1 " v-show="seen">

      
    </div>-->
    <van-popup v-model="show" position="bottom" round :style="{ height: '13.5rem' }" duration="0.2">
      <div class="popUp">
        <div class="topTex">发布</div>
        <div class="imgVideo">
          <div class="imgL" @click="toUpload(1)">
            <div class="imgs">
              <img src="../../assets/image/tupian.svg" width="100%" alt />
            </div>
            <div class="imgTex">图片</div>
          </div>
          <div class="videoR" @click="toUpload(2)">
            <div class="videos">
              <img src="../../assets/image/shipin.svg" width="100%" alt />
            </div>
            <div class="videoTex">视频</div>
          </div>
        </div>
        <div class="popUpBat" @click="showPopup">×</div>
      </div>
    </van-popup>
  </div>
</template>
 
<script>
export default {
  name: "",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = !this.show;
    },
    // selected() {
    //   this.active = !this.active;
    // },
    toUpload(id){
      // this.$rouer.push('/issue/index')
      this.$router.push({ path: `/issue/${id}` })
    }
  },
};
</script>
 
<style scoped lang='less'>
@import url("../tabBat/index.css");
</style>