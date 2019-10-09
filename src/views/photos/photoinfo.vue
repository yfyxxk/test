<template>
  <div class="photoinfo-container">
    <h1 class="title">{{ info.title }}</h1>
    <p class="subtitle">
      <span>发布时间：{{ info.add_time | timeFormat }}</span>
      <span>点击：{{ info.click }}次</span>
    </p>
    <hr />
    <section v-html="info.content" class="content"></section>
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    <comment></comment>
  </div>
</template>
<script>
import comment from "../../components/comment";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: [],
      slide1: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getPhotoThum();
  },
  components: {
    comment
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        } else {
          this.$toast("获取信息失败");
        }
      });
    },
    getPhotoThum() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.slide1 = result.body.message;
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 0 5px;
  .title {
    font-size: 15px;
    color: #26a2ff;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 26px;
  }
  /deep/ .my-gallery {
    margin: 5px;
    figure {
      display: inline-block;
      margin: 0;
      padding: 0;
      img {
        width: 100px;
        height: 100px;
        margin: 5px;
      }
    }
  }
}
</style>
