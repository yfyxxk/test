<template>
  <div id="app-container" @scroll="scrollEvent($event)">
    <!-- 标题头部 -->
    <mt-header fixed title="欢迎来访">
      <div slot="left" v-show="$route.path == '/home'? false:true">
        <mt-button icon="back" @click="goBack">返回</mt-button>
      </div>
    </mt-header>
    <!-- 中间部分 -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- 底边栏 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-xg" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-xg" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-xg" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getGoodsNum }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-xg" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <div class="up" v-show="flag" @click="backTop">
      <span class="mui-icon mui-icon-pulldown"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      dis: 0
    };
  },
  methods: {
    backTop() {
      this.$el.scrollTop = 0;
    },
    goBack() {
      this.$router.go(-1);
    },
    scrollEvent(e) {
      var dis = e.srcElement.scrollTop;      
      if (dis > 150) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  position: relative;   
  .up {
    z-index: 99;
    position: fixed;
    top: 83%;
    right: 4%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(202, 196, 196, 0.5);
    text-align: center;
    span {
      line-height: 50px;
      opacity: 0.6;
      font-size: 30px;
      font-weight: bold;
      transform: rotate(180deg);
    }
  }
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  position: absolute;
  transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-xg.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-xg {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-xg .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-xg .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mint-header {
  z-index: 99;
  font-size: 18px;
  .mint-button {
    line-height: 40px;
    font-size: 13px;
  }
}
</style>
