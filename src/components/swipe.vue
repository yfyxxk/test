<template>
  <div id="swipe-container">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in img" :key="index">
        <img :src="item.img" alt="图片" :class="{ full:isFull }" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["img", "isFull"]
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
    .full {
      width: 100%;
    }
  }
}
</style>
