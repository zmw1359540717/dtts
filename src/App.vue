<template>
  <div class="box">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <router-view></router-view>
  </div>
</template>
 

<script>
// import request from "./utils/req";

var _mtac = {};
console.log(_mtac);
(function () {
  var mta = document.createElement("script");
  mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
  mta.setAttribute("name", "MTAH5");
  mta.setAttribute("sid", "500733093");

  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(mta, s);
})();
window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
};
export default {
  data() {
    return {};
  },
  created() {
    // request("/wechat", {}, (res) => {
    //   console.log(res);
    // });
  },
  methods: {},
};
</script>
 
<style scoped  lang='less'>
.box {
  height: 100vh;
  max-width: 37.5rem;
}
</style>
