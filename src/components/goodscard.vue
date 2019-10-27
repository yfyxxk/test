<template>
  <div class="goods-container">
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goInfo(item.id)">
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
    </div>
  </div>
</template>
<script>
export default {
  props: ["goodslist"],
  methods: {
    goInfo(id) {
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
  .goods-item {
    min-height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 49%;
    padding: 2px;
    border: 1px solid #ccc;
    box-shadow: 0 0 4px #ccc;
    margin: 4px 0;
    img {
      width: 100%;
    }
    .goods-title {
      font-size: 14px;
    }
    .goods-subtitle {
      background-color: #eee;
      p {
        margin: 0;
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
    }
  }
}
</style>