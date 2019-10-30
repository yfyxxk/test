<template>
  <div class="home">
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="../../../public/img/1.jpg" alt="图片"/>
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../../public/img/2.jpg" alt="图片"/>
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../../public/img/3.jpg" alt="图片"/>
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/newslist">
          <span></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/photolist">
          <span class="photo"></span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/goodslist">
          <span class="goods"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <span class="comment"></span>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <span class="video"></span>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <span class="contact"></span>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      full: true,
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
    }
  }
  span {
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url("../../../public/img/home.png") no-repeat;
  }
  .photo {
    background-position: 0 -60px;
  }
  .goods {
    background-position: 0 -120px;
  }
  .comment {
    background-position: 0 -181px;
  }
  .video {
    background-position: 0 -242px;
  }
  .contact {
    background-position: -2px -304px;
  }
}
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
      width: 100%;
    }   
  }
}
</style>
