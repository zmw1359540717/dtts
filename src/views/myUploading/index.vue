<template>
<!-- 我的上传页 -->
  <div>
    <div class="UploadingContert">
      <div class="header">
        <router-link to="/index">
          <div class="imgIcon iconfont">&#xe614;</div>
        </router-link>
        <div class="imageName">我的上传</div>
      </div>
      <div class="imageMian">
        <!-- 图片 -->
        <div class="imgList"></div>
        <!-- 标题部分 -->
        <div class="headline">
          <div class="headlineBox">
            <div class="headlineTex">标题标题标题标题标题</div>
            <div class="price">¥140.00</div>
          </div>
          <div class="giveLike">
            <div class="giveLikeIcon iconfont">&#xe60b;</div>
            <div class="giveLikeNum">1001</div>
          </div>
        </div>
        <!-- 上传时间 -->
        <div class="uploadTime">上传于///两小时前</div>
        <!-- 介绍 -->
        <div
          class="introduce"
        >两英国品牌评估机构“品牌金融”(Bran两英国品牌评估机构“品牌金融”(Bran两英国品牌评估机构“品牌金融”(Bran两英国品牌评估机构“品牌金融”(Bran两英国品牌评估机构“品牌金融”(Bran两英国品牌评估机构“品牌金融”(Bran</div>
        <!-- 用户列表 -->
        <div class="imgUserList">
          <div class="head"></div>
          <div class="name">王大锤</div>
          <div class="jiantou iconfont">&#xe604;</div>
        </div>
      </div>
      <!-- 底部购买 -->
      <div class="botbuy">
        <div class="share">下架</div>
        <div class="compile">
            <div class="compileIcon iconfont">&#xe605;</div>
            <div class="compileTex">编辑</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>
 
<style scoped >
@import url("./index.css");
</style>