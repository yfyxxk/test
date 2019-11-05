import Vue from "vue";
import Router from "vue-router";
import Home from "./views/tabbar/Home.vue";
import Member from "./views/tabbar/Member.vue";
import Search from "./views/tabbar/Search.vue";
import newsList from "./views/news/newslist.vue";
import photoInfo from "./views/photos/photoinfo.vue";
import goodsInfo from "./views/goods/goodsinfo.vue";
import goodsComment from "./components/comment.vue";
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
      name: "shopcar",
      component: () => import("./views/tabbar/Shopcar.vue")
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
      name: "newsInfo",
      component: () => import("./views/news/newsinfo.vue")
    },
    {
      path: "/home/photolist",
      name: "photoList",
      component: () => import("./views/photos/photolist.vue")
    },
    {
      path: "/home/photoinfo/:id",
      component: photoInfo,
      meta: { keepAlive: true }
    },
    {
      path: "/home/goodslist",
      name: "goodList",
      component: () => import("./views/goods/goodslist.vue")
    },
    {
      path: "/home/goodsinfo/:id",
      component: goodsInfo,
      name: "goodsinfo",
      meta: { keepAlive: true }
    },
    {
      path: "/home/goodscomment/:id",
      component: goodsComment,
      name: "goodsComment"
    },
    {
      path: "/home/goodsdesc/:id",
      component: () => import("./views/goods/goodsdesc.vue"),
      name: "goodsDesc"
    }
  ],
  linkActiveClass: "mui-active"
});
