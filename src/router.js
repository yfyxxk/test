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
    }
  ]
});
