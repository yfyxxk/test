<template>
  <div id="app-container">
    <!-- 标题头部 -->
    <mt-header fixed title="欢迎来访">
      <div slot="left" @click="goBack" v-show="$route.path == '/home'? false:true">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>
    <!-- 中间部分 -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- 底边栏 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-bar " to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-bar" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-bar" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getGoodsNum }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-bar" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  },
};
</script>

<style lang="scss" scoped>
#app-container {
  padding-top: 40px;
  padding-bottom: 50px;
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
.mui-bar-tab .mui-tab-item-bar {
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
.mui-bar-tab .mui-tab-item-bar .mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-bar .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-bar .mui-icon~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
