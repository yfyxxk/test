import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var shopCar = JSON.parse(localStorage.getItem("shopCar") || "[]");
export default new Vuex.Store({
  state: {
    shopCar: shopCar
  },
  mutations: {
    updataShopCar(state, info) {
      var flag = true;
      state.shopCar.some(item => {
        if (item.id === info.id) {
          item.count += info.count;
          flag = !flag;
        }
      });
      if (flag) {
        state.shopCar.push(info);
      }
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    }
  },
  getters: {
    getGoodsNum(state) {
      var count = 0;
      state.shopCar.forEach(item => {
        count += item.count;
      });
      return count;
    },
    getGoodsId(state) {
      var list = [];
      state.shopCar.forEach(item => {
        list.push(item.id);
      });
      return list;
    }
  },
  actions: {}
});
