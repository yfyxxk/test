<template>
  <div class="desc-container">
    <h1>{{ desc.title }}</h1>
    <hr />
    <article v-html="desc.content" class="content"></article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      desc: []
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.desc = result.body.message[0];
        } else this.$toast("获取信息失败");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.desc-container {
   padding: 0 3px; 
  overflow-y: auto;
  overflow-x: hidden; 
  h1 {
    font-size: 16px;
    color: #226aff;
    margin: 15px 0;
    text-align: center;
  }
  .content /deep/ {    
    p {
      margin-block-start: 0;
      margin-block-end: 0;
      margin: 0;
      padding: 0;
      word-break: break-all;
    }
    img {
      width: 100%;
      height: auto;
      line-height: 0;
    }
    p[align="center"] {
      line-height: 0;
    }
    table {
      width: 100%;
    }
    td {
      line-height: 0;
    }
    td[class="heise14"] {
      line-height: 21px;
    }
    td[align="center"] {
      width: 200px;
      line-height: 21px;
    }
  }
}
</style>
