import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
import "lib-flexible";
import "muse-ui/lib/styles/base.less";
import "./global.less";

import {
  Button,
  Select,
  AppBar,
  Icon,
  Popover,
  List,
  Avatar,
  BottomSheet,
  Pagination,
  Paper,
  Chip,
  Carousel,
  Card,
} from "muse-ui";
import "muse-ui/lib/styles/theme.less";

Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Popover);
Vue.use(List);
Vue.use(Avatar);
Vue.use(BottomSheet);
Vue.use(Pagination);
Vue.use(Paper);
Vue.use(Chip);
Vue.use(Carousel);
Vue.use(Card);

import { isPC } from "@/utils";
Vue.prototype.isPC = isPC;
Vue.prototype.avatar =
  "http://nevergiveupt.top/index.jpg";

import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "http://www.nevergiveupt.top/loading.gif",
  loading: "http://www.nevergiveupt.top/loading.gif",
  attempt: 1,
});

//过滤器
import * as filters from "./filter";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k])); //注册过滤器
Vue.prototype.filterDate = filters.filterDate; //时间过滤方法

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
