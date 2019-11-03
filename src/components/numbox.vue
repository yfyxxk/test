<template>
  <div class="mui-numbox count" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="getNumber" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
export default {  
  props: ["max"],
  mounted() {    
    this.mui(".mui-numbox").numbox();
  },
  watch: {
    max: function(newVal) {      
      this.mui(".count")
        .numbox()
        .setOption("max", newVal);
    }
  },
  methods: {
    getNumber() {
      this.$emit(
        "getCount",
        parseInt(
          this.mui(".mui-numbox")
            .numbox()
            .getValue()
        )
      );
    }
  }
};
</script>
