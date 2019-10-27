<template>
  <div class="up" v-show ="flag" @click="backTop">    
    <span class="mui-icon mui-icon-pulldown"></span>    
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag:false,
      dis:0
    }
  },  
  mounted() {    
    document.body.addEventListener("scroll", this.gundong);
    // this.$nextTick(function(){
    //   window.addEventListener('scroll',this.gundong)
    // })
  },
  destroyed() {
    document.body.removeEventListener("scroll", this.gundong);
  },
  methods: {
    backTop(){           
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    gundong() {      
      var dis = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.dis = dis;
      console.log(document.body.scrollTop)              
      if(dis > 120){
        this.flag = true
      }else{
        this.flag = false
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.up {  
  z-index: 99;
  position: fixed;
  top: 83%;
  right: 4%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  span {
    line-height: 50px;
    opacity: 0.6;
    font-size: 30px;
    font-weight: bold;
    transform: rotate(180deg);
  }
}
</style>