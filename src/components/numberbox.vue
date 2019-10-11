<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="getNumber" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../lib/mui/js/mui.min.js";
export default {
  props:['max'],
  mounted() {
    mui(".mui-numbox").numbox();
  },
  watch:{
    max : function (newVal){
      mui('.mui-numbox').numbox().setOption('max',newVal)
    }
  },
  methods: {
    getNumber() {
      this.$emit(
        "getCount",
        parseInt(
          mui(".mui-numbox")
            .numbox()
            .getValue()
        )
      );
    }
  }
};
</script>
