<template>
  <!-- 搜索页面 -->
  <div class="seekContert">
    <!-- 头部 -->
    <div class="header" style="left: 0px">
      <div class="tuiChu" @click="toMy">
        <div class="iconfont">&#xe614;</div>
      </div>
      <div class="headLine">搜索</div>
    </div>
    <!-- 搜索框 -->
    <div class="seekSearch">
      <div class="searchIcon iconfont icon-sousuo"></div>
      <input class="searchBtn" @input="changeInput()" @change="search" v-model="text" type="text" placeholder="请输入搜索内容" />
      <div class="chaIcon iconfont" v-show="isShow" @click="Empty">&#xe601;</div>
    </div>
    <!-- 列表 -->
    <!-- 没数据 出错-->
    <div class="error" v-show="error">
      <div class="errorImg">
        <img src="../../assets/image/ziyuan.png" alt class="errorimg" />
      </div>
      <div class="errorTex">哎呀，服务器出错啦</div>
    </div>
    <!-- 没有内容 -->
    <div class="fruitless" v-show="fruitless">
      <div class="fruitImg">
        <img class="fruitimg" src="../../assets/image/ziyuan1.png" alt />
      </div>
      <div class="fruitTex">抱歉，没有找到您想要的内容</div>
    </div>
    <List :imgList="imgList" />
  </div>
</template>
 
<script>
import List from "../../components/List/index";
import request from "../../utils/req";

export default {
  name: "",
  data() {
    return {
      text: "",
      imgList: [],
      fruitless: false, //没内容
      error: false, //报错时
      isShow: false,
    };
  },
  components: {
    List,
  },
  created() {},
  watch: {
    
  },
  methods: {
    changeInput(){
      if(this.text != ""){
        this.isShow =true
      }else{
        this.isShow =false
      }
    },
    search() {
      request(
        "product/getlist",
        {
          keyword: this.text,
        },
        (res) => {
          console.log(res);
          if (res.data.count === 0) {
            this.fruitless = true;
          } else {
            this.fruitless = false;
          }
          if (res.status == 200) {
            this.imgList = res.data.info;
          } else {
            this.fruitless = false;
            this.error = true;
          }
        }
      );
    },
    Empty() {
      this.text = "";
    },
    toMy() {
      this.$router.push({ path: `/index` });
    },
  },
};
</script>
 
<style scoped  lang = 'less'>
@import url("./index.css");
.error {
  width: 100%;
  text-align: center;

  .errorImg {
    width: 5.95rem;
    height: 6.55rem;
    margin: 0 auto;
    margin-top: 5.95rem;

    .errorimg {
      width: 5.95rem;
      height: 6.55rem;
      display: inline-block;
    }
  }

  .errorTex {
    width: 100%;
    height: 0.9rem;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.9rem;
    margin-top: 1.5rem;
  }
}
.fruitless {
  width: 100%;
  text-align: center;
  .fruitImg {
    width: 6.9rem;
    height: 4.9rem;
    margin: 0 auto;
    margin-top: 6.45rem;
    .fruitimg {
      width: 6.9rem;
      height: 4.9rem;
      display: inline-block;
    }
  }

  .fruitTex {
    width: 100%;
    height: 0.9rem;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 0.9rem;
    margin-top: 2rem;
  }
}
</style>