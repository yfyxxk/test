<template>
  <div class="photo-container">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',num == i?'mui-active': '']"            
            href="#item1mobile"
            v-for="(item,i) in photoList"
            :key="i"
            @click="getPhotoList(item.id,i)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h3 class="info-title">{{item.title}}</h3>
          <section class="info-content">{{item.zhaiyao}}</section>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
//导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {
      photoList: [],
      list: [],
      num:0
    };
  },
  //初始化滚动条
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getPhotoTitle();
    this.getPhotoList(0, 0);
  },
  methods: {
    getPhotoTitle() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          this.photoList = result.body.message;
          this.photoList.unshift({ title: "全部", id: 0 });
        } else {
          Toast("获取信息失败");
        }
      });
    },
    getPhotoList(id, index) {
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          this.num = index;
          this.list = result.body.message;          
        } else {
          this.$toast("获取信息失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-container {
  .photo-list {
    list-style: none;
    padding: 10px 10px 0 10px;
    margin: 0;    
    li {      
      text-align: center;
      box-shadow: 0 0 8px #999;
      background-color: #ccc;
      margin-bottom: 10px;
      position: relative;
      img {
        width: 100%;
        vertical-align: middle;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info{
        color: white;
        background-color: rgba(0, 0, 0,0.4);
        max-height: 84px;
        position: absolute;
        bottom: 0;      
        text-align: left;
        //overflow: hidden;
        .info-title{
          font-size: 14px;
        }
        .info-content{
          text-overflow:ellipsis;                           
          font-size: 13px;
        }
      }
    }
  }
}
</style>
