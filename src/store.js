import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var shopCar = JSON.parse(localStorage.getItem("shopCar") || "[]");
export default new Vuex.Store({
  state: {
    shopCar: shopCar
  },
  mutations: {
    updateShopCar(state, info) {
      var flag = true;
      state.shopCar.some(item => {
        if (item.id == info.id) {
          item.count += info.count;
          flag = !flag;
        }
      });
      if (flag) {
        state.shopCar.push(info);
      }
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    },
    changeCount(state, list) {
      state.shopCar.some(item => {
        if (item.id == list.id) {
          item.count = list.count;
        }
      });
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    },
    delItem(state, id) {
      state.shopCar.some((item, i) => {
        if (item.id == id) {
          state.shopCar.splice(i, 1);
        }
      });
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    },
    updateSelected(state, info) {
      state.shopCar.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
          return true;
        }
      });
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    }
  },
  getters: {
    getGoodsNum(state) {
      var count = 0;
      count = state.shopCar.length;
      return count;
    },
    getGoodsId(state) {
      var list = [];
      state.shopCar.forEach(item => {
        list.push(item.id);
      });
      return list;
    },
    getItemNum(state) {
      var numList = {};
      state.shopCar.forEach(item => {
        numList[item.id] = item.count;
      });
      return numList;
    },
    getSelected(state) {
      var list = {};
      state.shopCar.forEach(item => {
        list[item.id] = item.selected;
      });
      return list;
    },
    getTotal(state) {
      var price = 0;
      var num = 0;
      state.shopCar.forEach(item => {
        if (item.selected === true) {
          num += item.count;
          price += item.count * item.price;
        }
      });
      return { price: price, count: num };
    }
  },
  actions: {}
});
