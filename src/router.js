import Vue from "vue";
import Router from "vue-router";
import Home from "./views/tabbar/Home.vue";
import Member from "./views/tabbar/Member.vue";
import Shopcar from "./views/tabbar/Shopcar.vue";
import Search from "./views/tabbar/Search.vue";
import newsList from "./views/news/newslist.vue";
import newsInfo from "./views/news/newsinfo.vue";
import photoList from "./views/photos/photolist.vue";
import photoInfo from "./views/photos/photoinfo.vue";
import goodsList from "./views/goods/goodslist.vue";
import goodsInfo from "./views/goods/goodsinfo.vue";
import goodsComment from "./components/comment.vue";
import goodsDesc from "./views/goods/goodsdesc.vue";
Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/member",
      component: Member
    },
    {
      path: "/shopcar",
      component: Shopcar
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/home/newslist",
      component: newsList
    },
    {
      path: "/home/newsinfo/:id",
      component: newsInfo
    },
    {
      path: "/home/photolist",
      component: photoList
    },
    {
      path: "/home/photoinfo/:id",
      component: photoInfo
    },
    {
      path: "/home/goodslist",
      component: goodsList
    },
    {
      path: "/home/goodsinfo/:id",
      component: goodsInfo,
      name: "goodsinfo"
    },
    {
      path: "/home/goodscomment/:id",
      component: goodsComment,
      name: "goodsComment"
    },
    {
      path: "/home/goodsdesc/:id",
      component: goodsDesc,
      name: "goodsDesc"
    }
  ],
  linkActiveClass: "mui-active"
});
