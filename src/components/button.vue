<template>    
    <button class="btn" @touchstart.prevent="start($event)||send()" @touchend="end">{{msg}}</button>    
</template>
<script>
export default {
  props:['msg'],
  methods:{
    send(){      
      this.$emit("send")
    },
    start(e){      
      e.srcElement.classList.add("active");    
    },
    end(e){
      e.target.classList.remove("active");
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  margin: 10px 0 10px 10px;
  background-color: #26a2ff;
  border: 0;
  padding: 0 12px;
  width: 100px;
  height: 33px;
  border-radius: 4px;
  font-size: 14px;
  color: white;
  outline: none;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  margin-right:5px;
  display: inline-block;
}
.active {
  background-color: #808080 !important;
}
</style>