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

import { isPC } from "@/utils";
Vue.prototype.isPC = isPC;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
