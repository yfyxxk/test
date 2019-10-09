import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";
import Mint from "mint-ui";
import VueResource from "vue-resource";
import * as filters from "./assets/filters";
import VuePreview from "vue-preview";
Vue.use(VuePreview);
Vue.use(Mint);
Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.http.options.root = "http://www.liulongbin.top:3005";
Vue.http.options.emulateJSON = true;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
