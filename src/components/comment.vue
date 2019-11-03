<template>
  <div class="cmt-container">
    <h1>发表评论</h1>
    <hr />
    <textarea maxlength="120" placeholder="评论最多120字" v-model="msg"></textarea>    
    <my-button class="primary" msg="发表评论" @send="sendComment"></my-button>
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
import myButton from "./button"
export default {
  data() {
    return {
      id: this.$route.params.id,
      pageIndex: 1,
      comments: [],
      msg: ""
    };
  },
  components:{
    "my-button":myButton
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
      if (this.msg.trim().length === 0) {
        return Toast({
          message: "内容不能为空",
          duration: 1000
        });
      }
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
    margin-top: 5px;
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
  .primary{
    width: 100%;
    height: 41px;
    font-size: 18px;
    margin: 0;
  }
}
</style>


