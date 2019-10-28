<template>
  <div class="msg-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div id="ball" v-show="full" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :img="goodsImages" :isFull="full"></swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div>
            <p>
              <span>市场价：</span>
              <del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;
              <span>销售价：</span>
              <span class="new">￥{{ goodsInfo.sell_price }}</span>
            </p>
          </div>
          <p>
            购买数量：
            <numberbox @getCount="getGoodsCount" :max="goodsInfo.stock_quantity"></numberbox>
          </p>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="clickFlag && addToShopCar()">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsInfo.add_time | timeFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getDesc(goodsInfo.id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getComments(goodsInfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swipe from "../../components/swipe";
import numberbox from "../../components/numbox";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsInfo: [],
      goodsImages: [],
      full: false,
      goodsCount: 1,
      clickFlag: true
    };
  },
  components: {
    swipe,
    numberbox
  },
  created() {
    this.getGoodsInfo();
    this.getGoodsImages();
  },
  methods: {
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        } else {
          this.$toast("获取信息失败");
        }
      });
    },
    getGoodsImages() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.goodsImages = result.body.message;
        } else {
          this.$toast("获取图片失败");
        }
      });
    },
    getComments(id) {
      this.$router.push({ name: "goodsComment", params: { id } });
    },
    getDesc(id) {
      this.$router.push({ name: "goodsDesc", params: { id } });
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      this.clickFlag = false;
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.4s cubic-bezier(.52,-0.21,.83,.67)";
      done();
    },
    afterEnter() {
      this.full = !this.full;
    },
    afterLeave() {
      this.clickFlag = true;
    },
    addToShopCar() {
      this.full = !this.full;
      var info = {
        id: this.id,
        price: this.goodsInfo.sell_price,
        selected: true,
        count: this.goodsCount
      };
      this.$store.commit("updateShopCar", info);
    },
    getGoodsCount(num) {
      this.goodsCount = num;
    }
  }
};
</script>
<style lang="scss" scoped>
.msg-container {
  background-color: #eee;
  overflow: hidden;  
  .mui-card-content-inner {
    .new {
      color: red;
      font-weight: bold;
      font-size: 15px;
    }
    .mint-button--small {
      width: 100px;
      margin-right: 5px;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  #ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    z-index: 99;
    position: absolute;
    top: 391px;
    left: 151px;
  }
}
</style>
