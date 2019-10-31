<template>
  <div>
    <div id="shopcar-container" v-if="$store.getters.getGoodsNum">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goods-message" v-for="(item,i) in goodsList" :key="i">
            <mt-switch
              v-model="$store.getters.getSelected[item.id]"
              @change="selectedChange(item.id,$store.getters.getSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt="商品图片" />
            <div>
              <h1>{{ item.title }}</h1>
              <p>
                <span>￥{{ item.sell_price }}</span>
                <numbox :goodsId="item.id"></numbox>
                <a href="#" @click.prevent="delItem(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goods-stat">
            <div>
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span>{{ $store.getters.getTotal.count }}</span>件，总价：
                <span>￥{{ $store.getters.getTotal.price }}</span>
              </p>
            </div>
            <mt-button type="danger" size="small">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="sub-container">
      <div class="empty">
        <img src="../../assets/img/shopcar.png" alt="图片" />
        <h1>购物车是空的,赶紧行动吧！</h1>
      </div>
    </div>
    <div>
      <h1 id="title">~~猜你喜欢~~</h1>
      <goodscard :goodslist="goodsSample"></goodscard>
      <mt-button type="primary" size="large" @click="toList">查看更多</mt-button>
    </div>
  </div>
</template>
<script>
import numbox from "../../components/shopnumbox";
import goodscard from "../../components/goodscard";
export default {
  data() {
    return {
      goodsList: [],
      goodsSample: []
    };
  },
  components: {
    numbox,
    goodscard
  },
  created() {
    this.getGoodsList();
    this.getSample();
  },
  methods: {
    getGoodsList() {
      var list = this.$store.getters.getGoodsId;
      if (list.length <= 0) return;
      this.$http
        .get("api/goods/getshopcarlist/" + list.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodsList = result.body.message;
          } else this.$toast("获取信息失败");
        });
    },
    delItem(id, index) {
      this.goodsList.splice(index, 1);
      this.$store.commit("delItem", id);
    },
    selectedChange(id, val) {
      this.$store.commit("updateSelected", { id: id, selected: val });
    },
    getSample() {
      this.$http.get("api/getgoods?pageindex=1").then(result => {
        if (result.body.status === 0) {
          var list = result.body.message;
          var num = Math.round(Math.random() * (list.length - 4));
          var info = list.slice(num, num + 4);
          this.goodsSample = info;
        }
      });
    },
    toList() {
      this.$router.push("/home/goodslist");
    }
  }
};
</script>
<style lang="scss" scoped>
#shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    padding: 4%;
  }
  .goods-stat {
    display: flex;
    justify-content: space-between;
    p {
      margin: 0;
    }
    span {
      color: red;
    }
  }
}
.goods-message {
  display: flex;
  align-items: center;
  img {
    width: 18%;
    margin: 0 4px;
  }
  h1 {
    font-size: 13px;
  }
  p {
    margin: 0;
    .mui-numbox {
      height: 25px;
      margin-right: 4px;
      width: 114px;
    }
    span {
      color: red;
      width: 47px;
      display: inline-block;
    }
  }
}
.sub-container {
  overflow: hidden;
  .empty {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 30px;
    h1 {
      font-size: 15px;
    }
  }
}
#title {
  text-align: center;
  font-size: 20px;
  color: #ff4400;
  margin-top: 15px;
}
</style>
