import Vue from 'vue'
import App from './App.vue'

// vant框架
import Vant from 'vant';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';
Vue.use(ElementUI);

Vue.use(Vant);
// 轮播图
import { PullRefresh, Toast, Loading, Form, Button, Swipe, SwipeItem, Field, Uploader, Search, Popup, Dialog, Overlay, NavBar, Icon, DropdownMenu, DropdownItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
// 文本域
Vue.use(Field);
// 上传
Vue.use(Uploader);
// 搜索
Vue.use(Search);
//弹出层
Vue.use(Popup);
// 弹框
//遮罩层
Vue.use(Overlay);
Vue.use(Icon);
// NavBar导航栏
Vue.use(NavBar);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// 全局注册
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(PullRefresh);
// import less from 'less'
// Vue.use(less)
// import { Lazyload } from 'vant';

// Vue.use(Lazyload);

// // 注册时可以配置额外的选项
// Vue.use(Lazyload, {
//   lazyComponent: true,
// });
// 初始样式
import './assets/css/base.css'
import './assets/js/set_root.js'
import './assets/icon/iconfont.css'
import './assets/svg/iconfont.css'
import './assets/icon-1/iconfont.css'
import './assets/js/zoom.js'
import './assets/aixinicon/iconfont.css'
// 路由
import router from './router/router'
// axios
// import { http } from './api/http'
import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
