<template>
  <div id="shopcar-container">
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
</template>
<script>
import numbox from "../../components/shopnumbox";
export default {
  data() {
    return {
      goodsList: []
    };
  },
  components: {
    numbox
  },
  created() {
    this.getGoodsList();
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
      this.$store.commit('updateSelected',{id:id,selected:val})
    }
  }
};
</script>
<style lang="scss" scoped>
#shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner{
    padding:4%;
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
        margin: 0 5px;
      }
      span {
        color: red;
        width: 47px;
        display:inline-block;
      }
    }
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
</style>
