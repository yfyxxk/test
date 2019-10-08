<template>
  <div id="newslist-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发布时间：{{item.add_time | timeFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewslist();
  },
  methods: {
    getNewslist() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          this.newsList = result.body.message;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#newslist-container {
  .mui-table-view {
    .mui-media-body {
      h1 {
        font-size: 14px;
      }
      font-size: 14px;
      .mui-ellipsis {
        font-size: 12px;
        color: blue;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
