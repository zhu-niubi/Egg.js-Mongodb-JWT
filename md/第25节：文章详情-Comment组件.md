# 第 25节：文章详情-Comment组件

## 1.新建components/Comment.vue

```bash
<template>
  <div class="comemnt clearfix">
    <mu-card-title></mu-card-title>
    <mu-text-field
      class="comment-input"
      placeholder="说点什么..."
      multi-line
      :rows="4"
      full-width
      v-model="content"
    ></mu-text-field>
    <mu-button @click="submit" class="comment-btn" color="primary"
      >评论</mu-button
    >

    <mu-dialog
      title="提示"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert"
    >
      评论内容需要审核，大约需要24小时。您确定需要继续操作吗？
      <mu-button slot="actions" flat color="primary" @click="ok(false)"
        >取消</mu-button
      >
      <mu-button slot="actions" flat color="primary" @click="ok(true)"
        >确定</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
export default {
  props: {
    commentSuccess: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: "",
      openAlert: false,
    };
  },
  methods: {
    submit() {
      if (this.content) {
        this.openAlert = true;
      } else {
        this.$toast.info("请输入评论内容");
      }
    },
    ok(bool) {
      if (bool) {
        this.$emit("comment", {
          content: this.content,
        });
      } else {
        this.openAlert = false;
        this.content = "";
      }
    },
  },
  watch: {
    // 评论成功后关闭弹框
    commentSuccess(val) {
      if (val) {
        this.openAlert = !val;
        this.content = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.comment-input {
  padding: 0 0.42667rem;
}
.comment-btn {
  margin: 0 0.42667rem 0.42667rem 0;
  float: right;
}
</style>
```

## 2.Articles/Details.vue使用

```js
import Comment from "@/components/Comment";
```

局部注册：

```js
export default {
  name: "articlesDetails",
  components: {
  	// ...
    Comment,
  },
  // ...
  data(){
    return {
			// ...
      commentSuccess: false,
      // ...
    }
  }
}
```

## 3.页面使用

```vue
<mu-card id="comment" class="card">
   <Comment
   @comment="comment"
   :comment-success="commentSuccess"
    ></Comment>
</mu-card>
```

methods定义comment方法

```js
methods: {
    async comment(data) {
      console.log("评论数据", data);
      this.commentSuccess = true;
    },
  },
```

## 4.global.less添加`.clearfix`



```less
.clearfix {
  zoom: 1;
}
.clearfix::after,
.clearfix::before {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
```

## 5.安装muse-ui-toast

```bash
$ npm install muse-ui-toast -S
# or
$ yarn add muse-ui-toast
```

main.js使用

```js
import Toast from 'muse-ui-toast';

Vue.use(Toast, {
  position: "top", // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: "close", // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: "check_circle", // 成功信息图标
  infoIcon: "info", // 信息信息图标
  warningIcon: "priority_high", // 提醒信息图标
  errorIcon: "warning", // 错误信息图标
});
```

同时还使用了以下组件

```js
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
  Tooltip,
  TextField,
  Dialog,
  Snackbar
} from "muse-ui";

Vue.use(TextField);
Vue.use(Dialog);
Vue.use(Snackbar);
```

