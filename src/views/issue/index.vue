<template>
  <!-- 发布页 -->
  <div class="issueContert">
    <!-- 头部 -->
    <div class="header">
      <!-- <router-link to="/my"> -->
      <div class="issueIcon iconfont" @click="showCont">&#xe614;</div>
      <!-- </router-link> -->
      <div class="issueName">图片详情</div>
    </div>
    <div class="main">
      <van-form @submit="onSubmit">
        <!-- 文本域 -->
        <div class="richText">
          <van-field
            class="fieldText"
            maxlength="30"
            v-model="title"
            name="title"
            placeholder="添加标题"
          />
          <van-field
            class="textArea"
            name="product_content"
            v-model="product_content"
            rows="4"
            border
            type="textarea"
            maxlength="300"
            placeholder="添加描述文字，给人留下更深刻的印象"
            show-word-limit
          />
          <!-- 图片上传 -->
          <div class="uploadFiles" v-if="id == 1">
            <van-uploader
              :after-read="afterRead"
              v-model="fileList"
              multiple
              :max-count="9"
              preview-size="5rem"
              @delete="deleteImgs"
              @oversize="afterToast"
              v-on:oversize="oversize"
              :max-size="30 * 1024 * 1024"
              accept="image/*"
            />
          </div>
          <!-- 视频上传 -->
          <div class="uploadFiles" v-else>
            <van-uploader
              accept=".avi, .rmvb, .rm, .asf, .divx, .mpg, .mpeg, .wmv, .mp4, .mkv, .vob"
              :after-read="afterRead"
              v-model="fileList"
              @delete="deleteImgs"
              multiple
              :max-count="1"
              preview-size="5rem"
            />
          </div>
        </div>

        <!-- 价格 -->
        <div class="setPrice">
          <div class="setprice">设置价格</div>
          <!-- 单次购买 -->
          <div class="onceBuy">
            <van-cell-group class="onceBuyTex">
              <van-field
                class="field"
                input-align="right"
                v-model="once_value"
                name="product_money"
                label="单次购买"
                type="number"
                placeholder="请输入价格"
                @change="Change"
              />
            </van-cell-group>
            <div class="unit">元</div>
          </div>
          <!-- 次数 -->
          <div class="onceBuy">
            <van-cell-group class="onceBuyTex">
              <van-field
                class="field"
                name="product_amount"
                input-align="right"
                v-model="time_value"
                label="可购次数"
                type="number"
                placeholder="请输入次数"
              />
            </van-cell-group>
            <div class="unit">次</div>
          </div>
          <!-- 版权 -->
          <div class="onceBuy">
            <van-cell-group class="onceBuyTex">
              <van-field
                class="field"
                name="product_allmoney"
                input-align="right"
                v-model="copy_value"
                label="购买版权"
                type="number"
                placeholder="请输入价格"
              />
            </van-cell-group>
            <div class="unit">元</div>
          </div>
        </div>
        <!-- 选择分类 -->
        <div class="clsify">
          <van-field readonly class="dropdown" clickable label="选择分类" @click="showPicker = true"></van-field>
          <div class="iconfont">&#xe604;</div>
          <van-popup v-model="showPicker" round position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
        </div>

        <!-- 设置标签 -->
        <div class="tally">
          <div class="setTally">设置标签</div>

          <van-field name="checkboxGroup">
            <template #input>
              <van-checkbox-group
                v-model="checkboxGroup"
                direction="horizontal"
                class="tallyBat"
                :max="5"
              >
                <van-checkbox
                  class="tabsBox"
                  :name="item.id"
                  shape="square"
                  v-for="(item , index) in labellist"
                  :key="index"
                  checked-color="#cf1322"
                >{{item.content}}</van-checkbox>
                <van-button icon="plus" type="default" @click="userpopUp = true" size="small" />
              </van-checkbox-group>
            </template>
          </van-field>
        </div>

        <van-button class="upLoading" native-type="submit">上传</van-button>
      </van-form>
    </div>
    <!--退出弹框  -->
    <div class="bgcPopUp" v-show="popUp">
      <div class="popUp">
        <div class="hint">温馨提示</div>
        <div class="ifTuichu">您有内容尚未保存，确认退出吗？</div>
        <div class="Bat">
          <div class="leftBat" @click="showCont">取消</div>
          <div class="rightBat" @click="getOut">退出</div>
        </div>
      </div>
    </div>
    <!-- 标签弹框 -->
    <div class="bgcUserpopUp" v-show="userpopUp">
      <div class="userpopUp">
        <div class="hint">温馨提示</div>
        <input
          type="text"
          class="popupText"
          v-model="popupText"
          maxlength="6"
          placeholder="最多可输入6个字"
        />
        <div class="Bat">
          <div class="leftBat" @click="userpopUp = false">取消</div>
          <div class="rightBat" @click="labelAdd">添加</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import request from "../../utils/req";
import Toast from "vant";

export default {
  props: {
    id: String,
  },
  name: "",
  data() {
    return {
      checkbox: false, //标签
      checkboxGroup: [],
      checkboxId: "",
      // 选择分类
      value: "",
      showPicker: false,
      columns: [],

      title: "", //标题
      product_content: "", //文本域
      popUp: false, //退出弹框
      userpopUp: false, //标签弹框
      fileList: [], //上传图片
      popupText: "", //标签弹框内容
      once_value: "", //单次购买
      time_value: "", //次数
      copy_value: "", //版权
      value1: 0, //选择分类

      option1: [
        {
          text: "content",
          value: "id",
        },
        {
          text: "新款商品",
          value: 1,
        },
        {
          text: "活动商品",
          value: 2,
        },
      ],
      fullscreenLoading: true,
      uid: "",
      filesLists: [],
      labellist: [],
      groupList: [],

      items: [],
      activeId: 1,
      activeIndex: 0,
      tabsList: [],
      tabsId: "",
    };
  },
  created() {
    this.uid = this.id;
    this.labelList();
  },
  methods: {
    oversize() {
      this.$toast("图片太大了");
    },
    afterToast() {
      this.$toast({
        message: "文件大小不能超过 500kb",
      });
    },
    //   分类
    onConfirm(value, index) {
      this.value = value;
      this.showPicker = false;
      this.tabsId = this.tabsList[index].id;
    },
    Change(value) {
      console.log(value);
    },
    // 图片限制大小
    onOversize(file) {
      console.log(file);
      Toast("文件大小不能超过 500kb");
    },
    labelAdd() {
      request(
        "product/labelAdd",
        {
          content: this.popupText,
          type: 2,
        },
        (res) => {
          console.log(res);
          if (res.status == 200) {
            this.labelList();
            this.userpopUp = false;
          }
        }
      );
    },
    //   初始化标签
    labelList() {
      request("/product/ProductUpload", {}, (res) => {
        // console.log(res);
        this.labellist = res.data.product_label;
        this.tabsList = res.data.product_type;
        for (var i = 0; i < res.data.product_type.length; i++) {
          this.columns.push(res.data.product_type[i].content);
        }
      });
    },
    // afterRead(file) {
    //   // 此时可以自行将文件上传至服务器
    //   console.log(file);
    // },
    showCont() {
      this.popUp = !this.popUp;
    },
    showContUser() {},
    getOut() {
      this.$router.push("/index");
    },
    onSubmit(values) {
      console.log("submit", values, this.$route.query);
      values.product_img_vedio = [];
      this.fileList.map((item) => {
        values.product_img_vedio.push(item.file);
      });
      values.product_img_vedio = values.product_img_vedio.join(",");
      values.product_label = this.checkboxGroup.join(",");
      values.uptype = this.$route.query.type;
      values.product_type = this.tabsId;
      request(
        "product/ProductUpload",
        {
          ...values,
          uptype: this.id,
        },
        (res) => {
          console.log(res);
          if (res.status == 200) {
            this.$router.push({ path: `/myUpload` });
            this.$toast({
              message: "上传成功",
              position: "bottom",
            });
          }
        }
      );
    },
    deleteImgs() {
      this.filesLists = this.fileList;
    },
    async afterRead(file) {
      console.log(Array.isArray(file));
      // return;
      // const filesData = [];
      if (Array.isArray(file)) {
        file.map(async (item) => {
          let formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
          formData.append("file", item.file); //接口需要传的参数
          formData.append("uid", localStorage.getItem("uid"));
          formData.append("token",  localStorage.getItem("token"));
          await axios
            .post("http://lumen.hupo-games.com/product/UploadFile", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                console.log(this.fileList);
                this.filesLists.push({
                  message: "",
                  status: "",
                  file: res.data.data[0],
                  content: item.content,
                });
              }
              this.fileList = this.filesLists;
            });
        });
      } else {
        let formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
        formData.append("file", file.file); //接口需要传的参数
        formData.append("uid", 1);
        formData.append("token", 1);
        await axios
          .post("http://lumen.hupo-games.com/product/UploadFile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log(this.fileList);
              this.filesLists.push({
                message: "",
                status: "",
                file: res.data.data[0],
                content: file.content,
              });
            }
            this.fileList = this.filesLists;
          });
      }
      // 此时可以自行将文件上传至服务器
    },
  },
};
</script>

<style scoped>
@import url("../issue/index.css");
</style>
