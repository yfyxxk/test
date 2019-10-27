<template>
  <div class="newsinfo-container">
    <h1 class="title">{{info.title}}</h1>
    <p class="subtitle">
      <span>发布时间：{{info.add_time | timeFormat}}</span>
      <span>点击：{{info.click}}次</span>
    </p>
    <hr />
    <div class="content" v-html="info.content"></div>
    <comment></comment>
  </div>
</template>
<script>
import comment from "../../components/comment";
import {Toast} from "mint-ui"
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: []
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        } else {
          Toast("获取信息失败");
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>
<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 4px;   
    .title{
        font-size: 16px;
        margin: 15px 0;
        color: red;
        text-align: center;
    }
    .subtitle{
        display:flex;
        justify-content: space-between;
        font-size: 12px;
    }
}  
</style>
