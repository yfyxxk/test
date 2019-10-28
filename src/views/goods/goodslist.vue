<template>
  <div class="goods-container">
    <ul
      v-infinite-scroll="flag2&&loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="5"
    >
      <li class="goods-item" v-for="item in goodslist" :key="item.id" @click="goInfo(item.id)">
        <div>
          <img :src="item.img_url" alt="商品图片" />
          <h1 class="goods-title">{{item.title}}</h1>
        </div>
        <div class="goods-subtitle">
          <p class="price">
            <span class="new">￥{{item.sell_price}}</span>
            <del class="old">￥{{item.market_price}}</del>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </li>
    </ul>
    <p class="loading" v-show="flag">
      <mt-spinner type="fading-circle" :size="40" color="#26a2ff"></mt-spinner>
    </p>
    <!-- <mt-button type="danger" size="large" @click="getMore" v-if="flag">加载更多</mt-button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1,
      goodslist: [],
      flag: false,
      flag2: true
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get("api/getgoods?pageindex=" + this.num).then(result => {
        if (result.body.status === 0) {
          this.goodslist.push(...result.body.message);
          if (result.body.message.length === 0) {
            return (this.flag2 = false);
          }
        } else {
          this.$toast("获取信息失败");
        }
      });
    },
    loadMore() {
      this.loading = true;
      this.flag = true;
      var time = setTimeout(() => {
        this.num++;
        this.getGoodsList();
        this.loading = false;
        this.flag = false;
      }, 2000);
      if (this.flag2 == false) {
        this.flag = false;
        clearTimeout(time);
      }
    },
    goInfo(id) {
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-container {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;
    margin: 0;
  }
  p {
    margin: 0;
  }
  .loading {
    text-align: center;
    /deep/ div {
      display: inline-block;
    }
  }
}
.goods-item {
  list-style: none;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 49%;
  padding: 2px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
  margin: 4px 0;
  h1 {
    margin-top: 0;
  }
  img {
    width: 100%;
  }
}
.goods-title {
  font-size: 14px;
}
.goods-subtitle {
  background-color: #eee;
}
.price {
  .new {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .old {
    font-size: 13px;
    margin-left: 10px;
  }
}
.sell {
  display: flex;
  justify-content: space-between;
}
</style>