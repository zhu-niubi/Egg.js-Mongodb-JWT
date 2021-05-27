# 第 24节：文章详情-mavonEditor组件

我们的文章内容是通过md语法来书写的。所有前台这边选用[mavonEditor](https://github.com/hinesboy/mavonEditor/blob/master/README.md)来解析。

## 1.安装mavonEditor

```bash
$ npm install mavon-editor --save
```

## 2.引入

```js
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
```

局部注册：

```js
export default {
  name: "articlesDetails",
  components: {
  	// ...
    mavonEditor,
  },
  // ...
  data(){
    return {
            content:'在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n### 2.使用',
      info: {},
      prev: {},
      next: {},
      toc: [], // 目录
      commentSuccess: false,
      commentList: [],
    }
  }
}
```

## 3.页面使用

```vue
<mavonEditor
   v-model="content"
   :ishljs="true"
   :toolbarsFlag="false"
   :subfield="false"
   defaultOpen="preview"
   codeStyle="tomorrow-night-eighties"
   :navigation="isPC"
/>
```

[配置项文档](https://github.com/hinesboy/mavonEditor/blob/master/README.md)

## 4.隐藏默认的目录导航并自定义

global.less添加

```less
// 文章导航
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.transition {
  display: none;
}
.v-note-wrapper
  .v-note-panel
  .v-note-navigation-wrapper
  .v-note-navigation-content
  h3 {
  padding-left: 20px !important;
}

@media screen and (max-width: 750px) {
  .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
    width: 10rem !important;
  }
}
```

如何自定义？核科技-->`Jquery`

安装jquery

```bash
$ yarn add jquery
# OR
$ npm install jquery
```

使用：

```js
import $ from "jquery";
```

```vue
<mu-card v-if="toc.length > 0" class="card">
        <div class="toc">
          <div class="title">文章目录</div>
           <!-- 遍历目录 -->
          <div v-for="item in toc" :key="item.name">
            <a @click="scrollToPosition(item.href)" v-html="item.name"></a>
          </div>
        </div>
      </mu-card>
```

mounted函数里面构建自定义目录

```js
mounted() {
  // 到接口请求哪一步，直接将这部分代码移动到接口请求成功之后即可。
    this.$nextTick(() => {
      const aArr = $(
        ".v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content a"
      ).toArray();
      let toc = [];
      aArr.forEach((item) => {
        let href = $(item).attr("id");
        let name = $(item).parent().text();
        if (href) {
          toc.push({
            href: "#" + href,
            name,
          });
        }
      });
      this.toc = toc;
    });
  },
```

methods添加滚动函数

```js
scrollToPosition(id) {
  var position = $(id).offset();
  position.top = position.top - 80;
  $("html,body").animate({ scrollTop: position.top }, 1000);
},
```



## 5.遗留一个问题：代码高亮处理

如不需要hightlight代码高亮显示，你应该设置`ishljs`为`false`

为优化插件体积，从**v2.4.2**起以下文件将默认使用`cdnjs`外链:

- `highlight.js`
- `github-markdown-css`
- `katex`(**v2.4.7**)

代码高亮`highlight.js`中的语言解析文件和代码高亮样式将在使用时按需加载. `github-markdown-css`和`katex`仅会在`mounted`时加载

**Notice**: [可选配色方案](https://github.com/hinesboy/mavonEditor/blob/master/src/lib/core/hljs/lang.hljs.css.js) 和 [支持的语言](https://github.com/hinesboy/mavonEditor/blob/master/src/lib/core/hljs/lang.hljs.js) 是从 [highlight.js/9.12.0](https://github.com/isagalaev/highlight.js/tree/master/src) 导出的

[本地按需加载](https://github.com/hinesboy/mavonEditor/blob/master/doc/cn/no-cnd.md)



完整代码：

```vue
<template>
  <div class="details">
    <Header :light-index="1"></Header>

    <div v-if="isPC" class="toc-fixed">
      <mu-card class="card">
        <div class="toc">
          <div class="title">文章目录</div>
          <div v-for="item in toc" :key="item.name">
            <a @click="scrollToPosition(item.href)" v-html="item.name"></a>
          </div>
        </div>
      </mu-card>
      <div class="action" :class="toc.length > 0 ? '' : 'noMulu'">
        <mu-tooltip placement="top" content="点赞">
          <mu-button fab color="primary">
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip placement="top" content="收藏">
          <mu-button fab color="purple500">
            <mu-icon value="grade"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip placement="top" content="评论">
          <mu-button fab color="red">
            <mu-icon value="chat"></mu-icon>
          </mu-button>
        </mu-tooltip>
      </div>
    </div>

    <div class="content">
      <div v-if="isPC" class="right">
        <RightConfig showPosition="文章详情"></RightConfig>
      </div>
      <div class="left" :style="{ marginTop: isPC ? '16px' : 0 }">
        <div class="left-box" :style="{ width: isPC ? '70%' : '100%' }">
          <mu-card class="card">
            <mu-card-title
              :title="info.title"
              :sub-title="info.introduction"
            ></mu-card-title>
            <mu-card-media :style="{ height: isPC ? '400px' : 'auto' }">
              <img v-lazy="info.cover" style="height: 100%" />
            </mu-card-media>
            <mu-card-actions class="sub-title">
              <mu-button class="cursor-default" flat color="warning"
                >字数(1000)</mu-button
              >
              <mu-button class="cursor-default" flat color="secondary"
                >阅读大约2分钟</mu-button
              >
              <mu-button class="cursor-default" flat color="info"
                >查看(100)</mu-button
              >
              <mu-button class="cursor-default" flat color="error"
                >评论(100)</mu-button
              >
              <mu-button class="cursor-default" flat color="primary"
                >点赞(100)</mu-button
              >
              <mu-button class="cursor-default" flat color="#9e9e9e"
                >2021-05-20 13:14</mu-button
              >
            </mu-card-actions>
            <mavonEditor
              v-model="content"
              :ishljs="true"
              :toolbarsFlag="false"
              :subfield="false"
              defaultOpen="preview"
              codeStyle="tomorrow-night-eighties"
              :navigation="isPC"
            />

            <mu-card-actions>
              <mu-button class="cursor-default" flat color="primary">
                <mu-icon left value="dns"></mu-icon>
                分类
              </mu-button>

              <mu-button class="cursor-default" flat>
                <mu-icon left value="loyalty"></mu-icon>
                标签1
              </mu-button>
              <mu-button class="cursor-default" flat>
                <mu-icon left value="loyalty"></mu-icon>
                标签2
              </mu-button>
            </mu-card-actions>
          </mu-card>

          <div class="action-list">
            <mu-tooltip placement="top" content="点赞">
              <mu-button fab color="primary">
                <mu-icon value="thumb_up"></mu-icon>
              </mu-button>
            </mu-tooltip>

            <mu-tooltip placement="top" content="收藏">
              <mu-button fab color="purple500">
                <mu-icon value="grade"></mu-icon>
              </mu-button>
            </mu-tooltip>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import $ from "jquery";

export default {
  name: "articlesDetails",
  components: {
    RightConfig,
    Footer,
    Header,
    mavonEditor,
  },
  data() {
    return {
      info: {
        title: "使用jspdf+canvas2html将网页保存为pdf文件",
        introduction: "简介",
        cover: "http://nevergiveupt.top/canvas/html2canvas.png",
      },
      prev: {},
      next: {},
      content:
        "在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n### 2.使用",
      toc: [],
      commentSuccess: false,
      commentList: [],
    };
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      const aArr = $(
        ".v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content a"
      ).toArray();
      let toc = [];
      aArr.forEach((item) => {
        let href = $(item).attr("id");
        let name = $(item).parent().text();
        if (href) {
          toc.push({
            href: "#" + href,
            name,
          });
        }
      });
      this.toc = toc;
    });
  },
  methods: {
    scrollToPosition(id) {
      var position = $(id).offset();
      position.top = position.top - 80;
      $("html,body").animate({ scrollTop: position.top }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.details {
  padding-top: 64px;
}

.toc-fixed {
  position: fixed;
  width: 20%;
  right: 20px;
  top: 80px;
  .toc {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    word-break: break-all;
    padding: 0.2rem 0 0.2rem 0.2rem;
    .title {
      font-size: 0.4rem;
      margin-bottom: 10px;
    }
    a {
      display: inline-block;
      color: #2196f3;
      font-size: 0.32rem;
      cursor: pointer;
      padding: 5px 0;
      &:hover {
        color: #00e676;
      }
    }
  }
}

.action-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.42667rem 0;
}
.action {
  margin-top: 0.42667rem;
  display: flex;
  justify-content: space-around;
}
.noMulu {
  flex-direction: column;
  align-items: center;
  height: 400px;
}

.content {
  padding-bottom: 0.53333rem;
  display: flex;
  .left {
    flex: 9;
    margin-top: 16px;
    .card {
      border-radius: 5px;
      margin-bottom: 0.48rem;
      .article-detail {
        width: 100%;
        padding: 0.42667rem 0.42667rem 0.42667rem 0.69333rem;
        box-sizing: border-box;
        word-break: break-all;
      }
      .sub-title {
        display: flex;
        flex-wrap: wrap;
      }
      .text {
        padding: 0 0.42667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .chip {
        margin-right: 0.26667rem;
      }
      .cover {
        flex: 1;
        border-radius: 0;
        padding: 0.42667rem;
        .cover-img {
          object-fit: cover;
          width: 100%;
          height: 4.26667rem;
          vertical-align: middle;
        }
      }
      .card-box {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
  .right {
    flex: 3;
    display: flex;
    justify-content: center;
  }
}
</style>
```

