<template>
  <div class="home">
    <swipe :img="images"></swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../../public/img/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../../public/img/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../../public/img/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../../public/img/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../../public/img/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../../public/img/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import swipe from "../../components/swipe";
export default {
  data() {
    return {
      images: []
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    getImages() {
      this.$http.get("api/getlunbo").then(result => {
        if (result.body.status === 0) {
          this.images = result.body.message;
        }
      });
    }
  },
  components: {
    swipe
  }
};
</script>
<style lang="scss" scoped>
.home {
  .mui-table-view {
    background-color: white;
    border: 0;
    .mui-table-view-cell {
      border: 0;
      img {
        width: 60px;
      }
    }
  }
}
</style>
