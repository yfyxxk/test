<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="$store.getters.getItemNum[goodsId]"
      readonly
      @change="changeNum(goodsId)"
      ref="num"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../lib/mui/js/mui.min.js";
export default {
  props: ["goodsId"],
  mounted() {
    mui(".mui-numbox").numbox();  
  },
  methods: {
    changeNum(id) {
      var list = {
        id: id,        
        count: parseInt(this.$refs.num.value)
      };      
      this.$store.commit("changeCount", list);
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-numbox{
  min-width: 25%;
  button{
    min-width: 25%;
  }
}  
</style>
