import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/mui.min.css";
import "./assets/css/icons-extra.css";
import Mint from "mint-ui";
import VueResource from "vue-resource";
import * as filters from "./assets/filters";
import "./assets/css/main.css";
import VuePreview from "vue-preview";
import mui from "./assets/js/mui.min.js";
Vue.prototype.mui = mui;
Vue.use(VuePreview);
Vue.use(Mint);
Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.http.options.root = "http://www.liulongbin.top:3005";
Vue.http.options.emulateJSON = true;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.afterEach((to, from) => {
  vm.$el.scrollTop = 0;
});
