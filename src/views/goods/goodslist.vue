<template>
  <div class="goods-container">
    <goodsitem :goodslist="goodslist"></goodsitem>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import goodsitem from "../../components/goodscard";
export default {
  data() {
    return {
      num: 1,
      goodslist: []
    };
  },
  components: {
    goodsitem
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
            return this.$toast("没有了");
          }
        } else {
          this.$toast("获取信息失败");
        }
      });
    },
    getMore() {
      this.num++;
      this.getGoodsList();
    },
    goInfo(id) {
      this.$router.push({ name: "goodsinfo", params: { id } });
    }
  }
};
</script>
