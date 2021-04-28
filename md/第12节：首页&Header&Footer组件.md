# 第12节：首页&Header&Footer组件

## 1.App.vue修改为如下

```vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

## 2.web/src 新建router.js。删除原来的router文件夹

```js
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: {
      name: "index",
    },
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "index" */ "./views/Home/Index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;

```

## 3.components下新建Header.vue

```vue
<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- title -->
      <span style="cursor: pointer">NeverGiveUpT</span>

      <mu-avatar slot="left" class="header-avatar" :size="50">
        <img src="http://www.nevergiveupt.top/user_avatar.png" />
      </mu-avatar>

      <!-- 菜单 -->
      <mu-button
        class="menu-btn"
        slot="right"
        v-for="(item, index) in info.menu"
        :key="item.name"
        :color="lightIndex === index ? '#00e676' : ''"
        flat
      >
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{ item.name }}
      </mu-button>

      <!-- 主题切换 -->
      <mu-button flat slot="right" ref="theme" @click="openTheme = !openTheme">
        <mu-icon value="color_lens"></mu-icon>
      </mu-button>
      <mu-popover :open.sync="openTheme" :trigger="triggerTheme">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>Light</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Dark</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>

      <!-- 用户 -->
      <mu-button flat slot="right" ref="button" @click="openUser = !openUser">
        <div class="user">
          <span>永不放弃</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="trigger">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>
  </div>
</template>

<script>
const menus = [
  {
    name: "首页",
    router: "index",
    icon: "home",
  },
  {
    name: "文章",
    router: "articles",
    icon: "note_add",
  },
  {
    name: "归档",
    router: "archives",
    icon: "drafts",
  },
  {
    name: "分类",
    router: "categories",
    icon: "dns",
  },
  {
    name: "标签",
    router: "tags",
    icon: "loyalty",
  },
  {
    name: "关于",
    router: "about",
    icon: "perm_identity",
  },
];

export default {
  name: "Header",
  props: {
    lightIndex: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
    },
  },
  data() {
    return {
      openUser: false,
      openTheme: false,

      trigger: null,
      triggerTheme: null,

      info: {
        menu: menus,
      },
    };
  },
  mounted() {
    this.trigger = this.$refs.button.$el;
    this.triggerTheme = this.$refs.theme.$el;
  },
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 1501;
  width: 100%;
  top: 0;
}

.header-avatar {
  margin-left: 20px;
  cursor: pointer;
}

.mu-appbar {
  .mu-flat-button {
    flex: 1;
  }
  /deep/ .mu-appbar-right {
    flex: 1;
  }
}

.user {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
  }
}
</style>

```

## 4.main.js导入需要用的的组件

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import "muse-ui/lib/styles/base.less";
import {
  Button,
  Select,
  AppBar,
  Icon,
  Popover,
  List,
  Avatar,
} from "muse-ui";
import "muse-ui/lib/styles/theme.less";

Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Popover);
Vue.use(List);
Vue.use(Avatar);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

```

## 5.components下新建Footer.vue

```vue
<template>
  <div class="footer" :class="{ 'fixed-footer': fixed }">
    <div class="copyright">
      <a target="_blank" href="http://beian.miit.gov.cn"
        >Copyright © 2020 NeverGiveUpT・蜀ICP备2020026338号</a
      >
    </div>
    <div>本系统由Vue+Muse-UI提供技术支持</div>
  </div>
</template>
<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}

.footer {
  text-align: center;
  font-size: 0.26667rem;
  margin: 30px 0;
  .copyright {
    a {
      color: inherit;
    }
  }
}
</style>
```



## 6.views下新建Home/Index.vue

导入Header和Footer组件

```vue
<template>
  <div>
    <Header background="#000"></Header>
    <Footer fixed></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "index",
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
</style>
```

## 7.创建首页的背景动画

src下新建utils/index.js

```js
export const index_fullScreenAnimation = (ref_canvas) => {
  let size = 0;
  function project3D(x, y, z, lets) {
    let p, d;
    x -= lets.camX;
    y -= lets.camY - 8;
    z -= lets.camZ;
    p = Math.atan2(x, z);
    d = Math.sqrt(x * x + z * z);
    x = Math.sin(p - lets.yaw) * d;
    z = Math.cos(p - lets.yaw) * d;
    p = Math.atan2(y, z);
    d = Math.sqrt(y * y + z * z);
    y = Math.sin(p - lets.pitch) * d;
    z = Math.cos(p - lets.pitch) * d;
    let rx1 = -1000;
    let ry1 = 1;
    let rx2 = 1000;
    let ry2 = 1;
    let rx3 = 0;
    let ry3 = 0;
    let rx4 = x;
    let ry4 = z;
    let uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
    let ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
    let ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;
    if (!z) z = 0.000000001;
    if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
      return {
        x: lets.cx + (rx1 + ua * (rx2 - rx1)) * lets.scale,
        y: lets.cy + (y / z) * lets.scale,
        d: x * x + y * y + z * z,
      };
    } else {
      return { d: -1 };
    }
  }
  function elevation(x, y, z) {
    let dist = Math.sqrt(x * x + y * y + z * z);
    if (dist && z / dist >= -1 && z / dist <= 1) return Math.acos(z / dist);
    return 0.00000001;
  }
  function rgb(col) {
    col += 0.000001;
    let r = parseInt((0.5 + Math.sin(col) * 0.5) * 16);
    let g = parseInt((0.5 + Math.cos(col) * 0.5) * 16);
    let b = parseInt((0.5 - Math.sin(col) * 0.5) * 16);
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
  }
  function interpolateColors(RGB1, RGB2, degree) {
    let w2 = degree;
    let w1 = 1 - w2;
    return [
      w1 * RGB1[0] + w2 * RGB2[0],
      w1 * RGB1[1] + w2 * RGB2[1],
      w1 * RGB1[2] + w2 * RGB2[2],
    ];
  }
  function rgbArray(col) {
    col += 0.000001;
    let r = parseInt((0.5 + Math.sin(col) * 0.5) * 256);
    let g = parseInt((0.5 + Math.cos(col) * 0.5) * 256);
    let b = parseInt((0.5 - Math.sin(col) * 0.5) * 256);
    return [r, g, b];
  }
  function colorString(arr) {
    let r = parseInt(arr[0]);
    let g = parseInt(arr[1]);
    let b = parseInt(arr[2]);
    return (
      "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2)
    );
  }
  function process(lets) {
    if (lets.points.length < lets.initParticles)
      for (let i = 0; i < 5; ++i) spawnParticle(lets);
    let p, d, t;
    p = Math.atan2(lets.camX, lets.camZ);
    d = Math.sqrt(lets.camX * lets.camX + lets.camZ * lets.camZ);
    d -= Math.sin(lets.frameNo / 80) / 25;
    t = Math.cos(lets.frameNo / 300) / 165;
    lets.camX = Math.sin(p + t) * d;
    lets.camZ = Math.cos(p + t) * d;
    lets.camY = -Math.sin(lets.frameNo / 220) * 15;
    lets.yaw = Math.PI + p + t;
    lets.pitch = elevation(lets.camX, lets.camZ, lets.camY) - Math.PI / 2;
    for (let i = 0; i < lets.points.length; ++i) {
      let x = lets.points[i].x;
      // let y = lets.points[i].y;
      let z = lets.points[i].z;
      let d = Math.sqrt(x * x + z * z) / 1.0075;
      let t = 0.1 / (1 + (d * d) / 5);
      p = Math.atan2(x, z) + t;
      lets.points[i].x = Math.sin(p) * d;
      lets.points[i].z = Math.cos(p) * d;
      lets.points[i].y +=
        lets.points[i].vy * t * ((Math.sqrt(lets.distributionRadius) - d) * 2);
      if (lets.points[i].y > lets.vortexHeight / 2 || d < 0.25) {
        lets.points.splice(i, 1);
        spawnParticle(lets);
      }
    }
  }
  function drawFloor(lets) {
    let x, y, z, d, point, a;
    for (let i = -25; i <= 25; i += 1) {
      for (let j = -25; j <= 25; j += 1) {
        x = i * 2;
        z = j * 2;
        y = lets.floor;
        d = Math.sqrt(x * x + z * z);
        point = project3D(x, y - (d * d) / 85, z, lets);
        if (point.d != -1) {
          size = 1 + 15000 / (1 + point.d);
          a = 0.15 - Math.pow(d / 50, 4) * 0.15;
          if (a > 0) {
            lets.ctx.fillStyle = colorString(
              interpolateColors(
                rgbArray(d / 26 - lets.frameNo / 40),
                [0, 128, 32],
                0.5 + Math.sin(d / 6 - lets.frameNo / 8) / 2
              )
            );
            lets.ctx.globalAlpha = a;
            lets.ctx.fillRect(
              point.x - size / 2,
              point.y - size / 2,
              size,
              size
            );
          }
        }
      }
    }
    lets.ctx.fillStyle = "#82f";
    for (let i = -25; i <= 25; i += 1) {
      for (let j = -25; j <= 25; j += 1) {
        x = i * 2;
        z = j * 2;
        y = -lets.floor;
        d = Math.sqrt(x * x + z * z);
        point = project3D(x, y + (d * d) / 85, z, lets);
        if (point.d != -1) {
          size = 1 + 15000 / (1 + point.d);
          a = 0.15 - Math.pow(d / 50, 4) * 0.15;
          if (a > 0) {
            lets.ctx.fillStyle = colorString(
              interpolateColors(
                rgbArray(-d / 26 - lets.frameNo / 40),
                [32, 0, 128],
                0.5 + Math.sin(-d / 6 - lets.frameNo / 8) / 2
              )
            );
            lets.ctx.globalAlpha = a;
            lets.ctx.fillRect(
              point.x - size / 2,
              point.y - size / 2,
              size,
              size
            );
          }
        }
      }
    }
  }
  function sortFunction(a, b) {
    return b.dist - a.dist;
  }
  function draw(lets) {
    lets.ctx.globalAlpha = 0.15;
    lets.ctx.fillStyle = "#000";
    lets.ctx.fillRect(0, 0, lets.canvas.width, lets.canvas.height);
    drawFloor(lets);
    let point, x, y, z;
    for (let i = 0; i < lets.points.length; ++i) {
      x = lets.points[i].x;
      y = lets.points[i].y;
      z = lets.points[i].z;
      point = project3D(x, y, z, lets);
      if (point.d != -1) {
        lets.points[i].dist = point.d;
        size = 1 + lets.points[i].radius / (1 + point.d);
        let d = Math.abs(lets.points[i].y);
        let a = 0.8 - Math.pow(d / (lets.vortexHeight / 2), 1000) * 0.8;
        lets.ctx.globalAlpha = a >= 0 && a <= 1 ? a : 0;
        lets.ctx.fillStyle = rgb(lets.points[i].color);
        if (
          point.x > -1 &&
          point.x < lets.canvas.width &&
          point.y > -1 &&
          point.y < lets.canvas.height
        )
          lets.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
      }
    }
    lets.points.sort(sortFunction);
  }
  function spawnParticle(lets) {
    let p, ls;
    let pt = {};
    p = Math.PI * 2 * Math.random();
    ls = Math.sqrt(Math.random() * lets.distributionRadius);
    pt.x = Math.sin(p) * ls;
    pt.y = -lets.vortexHeight / 2;
    pt.vy = lets.initV / 20 + Math.random() * lets.initV;
    pt.z = Math.cos(p) * ls;
    pt.radius = 200 + 800 * Math.random();
    pt.color = pt.radius / 1000 + lets.frameNo / 250;
    lets.points.push(pt);
  }
  function frame(lets) {
    if (lets === undefined) {
      lets = {};
      lets.canvas = ref_canvas;
      lets.ctx = lets.canvas.getContext("2d");
      lets.canvas.width = window.innerWidth;
      lets.canvas.height = window.innerHeight;
      window.addEventListener(
        "resize",
        function() {
          lets.canvas.width = window.innerWidth;
          lets.canvas.height = window.innerHeight;
          lets.cx = lets.canvas.width / 2;
          lets.cy = lets.canvas.height / 2;
        },
        true
      );
      lets.frameNo = 0;
      lets.camX = 0;
      lets.camY = 0;
      lets.camZ = -14;
      lets.pitch = elevation(lets.camX, lets.camZ, lets.camY) - Math.PI / 2;
      lets.yaw = 0;
      lets.cx = lets.canvas.width / 2;
      lets.cy = lets.canvas.height / 2;
      lets.bounding = 10;
      lets.scale = 500;
      lets.floor = 26.5;
      lets.points = [];
      lets.initParticles = 1000;
      lets.initV = 0.01;
      lets.distributionRadius = 800;
      lets.vortexHeight = 25;
    }
    lets.frameNo++;
    requestAnimationFrame(function() {
      frame(lets);
    });
    process(lets);
    draw(lets);
  }
  frame();
};
```

components下新建IndexAnimation.vue

```vue
<template>
  <canvas class="index-canvas" ref="canvas">Canvas not supported.</canvas>
</template>
<script>
import { index_fullScreenAnimation } from "@/utils";
export default {
  mounted() {
    index_fullScreenAnimation(this.$refs.canvas);
  },
};
</script>
<style lang="less" scoped>
.index-canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}
</style>
```

Home/Index.vue导入

```vue
<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <Header background="transparent"></Header>
    <Footer fixed></Footer>
    <div class="common">
      <div class="home">
        <p>There is a kind of call to eat together.</p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndexAnimation from "@/components/IndexAnimation";

export default {
  name: "index",
  components: {
    Header,
    Footer,
    IndexAnimation,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.home {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 0.48rem;
  color: #fff;
  font-weight: 500;
}
</style>
```



## 7.src下创建global.less用于设置全局样式

```less
.common {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .right-box {
    position: fixed;
    top: 80px;
    left: 70px;
    z-index: 3;
  }
}


```

然后在main.js中引入使其生效

```js
// ...
import "./global.less";
// ...
```

## 8.设置字体打印机效果

Home/Index.vue

```vue
<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <Header background="transparent"></Header>
    <Footer fixed></Footer>
    <div class="common">
      <div class="home">
        <p>{{ info.introduction }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndexAnimation from "@/components/IndexAnimation";

let i = 0;
let timer = null;
export default {
  name: "index",
  components: {
    Header,
    Footer,
    IndexAnimation,
  },
  data() {
    return {
      info: {
        introduction: "",
        introductionTarget: "There is a kind of call to eat together.",
      },
    };
  },
  mounted() {
    this.typing();
  },
  methods: {
    typing() {
      if (i <= this.info.introductionTarget.length) {
        this.info.introduction =
          this.info.introductionTarget.slice(0, i++) + "_";
        timer = setTimeout(this.typing, 100);
      } else {
        this.info.introduction = this.info.introductionTarget; //结束打字,移除 _ 光标
        clearTimeout(timer);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 0.48rem;
  color: #fff;
  font-weight: 500;
}
</style>
```

这时页面的字体是比较小的。我们设置了`.home`的`font-size：0.48rem`。那么我们需要安装`lib-flexible`这个库用于适配移动端。

```bash
$ yarn add lib-flexible
```



main.js导入

```js
import "lib-flexible";
```



## 9.彩蛋

将Header组件改造为移动端和PC端都支持的

1.utils/index.js新增一个判断是否是PC端的boolean值。

```js
export const isPC = (() => {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
    "XiaoMi/MiuiBrowser",
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag && window.innerWidth > 750;
})();
```

2.main.js中将这个值挂载到Vue的原型上

```js
import { isPC } from "@/utils";
Vue.prototype.isPC = isPC;
```

3.Header.vue修改成如下

```vue
<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- title -->
      <span style="cursor: pointer">NeverGiveUpT</span>

      <!-- <mu-avatar slot="left" class="header-avatar" :size="50">
        <img src="http://www.nevergiveupt.top/user_avatar.png" />
      </mu-avatar> -->

      <!-- 菜单 -->
      <mu-button
        v-show="isPC"
        class="menu-btn"
        slot="right"
        v-for="(item, index) in info.menu"
        :key="item.name"
        :color="lightIndex === index ? '#00e676' : ''"
        flat
      >
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{ item.name }}
      </mu-button>

      <!-- 菜单图标 -->
      <mu-button v-show="!isPC" @click="toggleWapMenu(true)" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>

      <!-- wap-菜单 -->
      <mu-bottom-sheet :open.sync="openWapMenu">
        <mu-list @item-click="toggleWapMenu(false)">
          <mu-list-item
            @click="go(item)"
            v-for="(item, index) in info.menu"
            :key="item.name"
            button
          >
            <mu-list-item-action>
              <mu-icon
                :color="lightIndex === index ? '#00e676' : ''"
                :value="item.icon"
              ></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title
              :style="{ color: lightIndex === index ? '#00e676' : '' }"
              >{{ item.name }}</mu-list-item-title
            >
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>

      <!-- 主题切换 -->
      <mu-button flat slot="right" ref="theme" @click="openTheme = !openTheme">
        <mu-icon value="color_lens"></mu-icon>
      </mu-button>
      <mu-popover :open.sync="openTheme" :trigger="triggerTheme">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>Light</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Dark</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>

      <!-- 用户 -->
      <mu-button flat slot="right" ref="button" @click="openUser = !openUser">
        <div class="user">
          <span>永不放弃</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="trigger">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>
  </div>
</template>

<script>
const menus = [
  {
    name: "首页",
    router: "index",
    icon: "home",
  },
  {
    name: "文章",
    router: "articles",
    icon: "note_add",
  },
  {
    name: "归档",
    router: "archives",
    icon: "drafts",
  },
  {
    name: "分类",
    router: "categories",
    icon: "dns",
  },
  {
    name: "标签",
    router: "tags",
    icon: "loyalty",
  },
  {
    name: "关于",
    router: "about",
    icon: "perm_identity",
  },
];

export default {
  name: "Header",
  props: {
    lightIndex: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
    },
  },
  data() {
    return {
      openUser: false,
      openTheme: false,
      openWapMenu: false,

      trigger: null,
      triggerTheme: null,

      info: {
        menu: menus,
      },
    };
  },
  mounted() {
    this.trigger = this.$refs.button.$el;
    this.triggerTheme = this.$refs.theme.$el;
  },
  methods: {
    toggleWapMenu(openWapMenu) {
      this.openWapMenu = openWapMenu;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 1501;
  width: 100%;
  top: 0;
}

.header-avatar {
  margin-left: 20px;
  cursor: pointer;
}

.mu-appbar {
  .mu-flat-button {
    flex: 1;
  }
  /deep/ .mu-appbar-right {
    flex: 1;
  }
}

.user {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
  }
}
</style>

```

wap版的使用了muse-ui的BottomSheet组件，别忘记在main.js中按需导入。

