<template>
  <div class="cmt-container">
    <h1>发表评论</h1>
    <hr />
    <textarea maxlength="120" placeholder="评论最多120字" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
    <div class="cmt-item" v-for="(item,i) in comments" :key="i">
      <div
        class="cmt-title"
      >第{{i+1}}楼&nbsp;用户：{{item.user_name}}&nbsp;发表时间：{{item.add_time | timeFormat}}</div>
      <div class="cmt-content">{{item.content}}</div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      pageIndex: 1,
      comments: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.comments.push(...result.body.message);
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    sendComment() {
      this.$http
        .post("api/postcomment/" + this.id, { content: this.msg.trim() })
        .then(result => {
          if (result.body.status === 0) {
            var newComment = {
              user_name: "匿名用户",
              add_time: new Date(),
              content: this.msg.trim()
            };
            this.comments.unshift(newComment);
            this.msg = "";
          } else {
            Toast("发表失败请重试");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h1 {
    font-size: 18px;
  }
  textarea {
    margin: 0;
    font-size: 14px;
    min-height: 90px;
  }
  .cmt-item {
    .cmt-title {
      font-size: 14px;
      background-color: #ccc;
      line-height: 30px;
    }
    .cmt-content {
      min-height: 40px;
      font-size: 14px;
    }
  }
}
</style>


